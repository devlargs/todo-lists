
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.31.2 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let div18;
    	let nav;
    	let div9;
    	let div8;
    	let div0;
    	let button0;
    	let span0;
    	let t1;
    	let svg0;
    	let path0;
    	let t2;
    	let svg1;
    	let path1;
    	let t3;
    	let div4;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t4;
    	let img1;
    	let img1_src_value;
    	let t5;
    	let div3;
    	let div2;
    	let a0;
    	let t7;
    	let a1;
    	let t9;
    	let a2;
    	let t11;
    	let a3;
    	let t13;
    	let a4;
    	let t15;
    	let a5;
    	let t17;
    	let a6;
    	let t19;
    	let div7;
    	let span2;
    	let span1;
    	let span2_classname_value;
    	let t20;
    	let div6;
    	let div5;
    	let a7;
    	let span3;
    	let t22;
    	let img2;
    	let img2_src_value;
    	let t23;
    	let div11;
    	let div10;
    	let a8;
    	let t25;
    	let a9;
    	let t27;
    	let a10;
    	let t29;
    	let a11;
    	let t31;
    	let a12;
    	let t33;
    	let a13;
    	let t35;
    	let a14;
    	let t37;
    	let div17;
    	let div16;
    	let div15;
    	let div12;
    	let svg2;
    	let path2;
    	let path3;
    	let path4;
    	let path5;
    	let path6;
    	let path7;
    	let path8;
    	let path9;
    	let path10;
    	let path11;
    	let g;
    	let path12;
    	let path13;
    	let path14;
    	let path15;
    	let path16;
    	let path17;
    	let path18;
    	let path19;
    	let path20;
    	let path21;
    	let t38;
    	let h4;
    	let t40;
    	let div13;
    	let input0;
    	let t41;
    	let label;
    	let span4;
    	let svg3;
    	let path22;
    	let t42;
    	let input1;
    	let label_classname_value;
    	let t43;
    	let form;
    	let div14;
    	let svg4;
    	let path23;
    	let t44;
    	let input2;
    	let t45;
    	let button1;
    	let t46;
    	let button1_classname_value;
    	let div15_classname_value;
    	let div16_classname_value;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div18 = element("div");
    			nav = element("nav");
    			div9 = element("div");
    			div8 = element("div");
    			div0 = element("div");
    			button0 = element("button");
    			span0 = element("span");
    			span0.textContent = "Open main menu";
    			t1 = space();
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t2 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t3 = space();
    			div4 = element("div");
    			div1 = element("div");
    			img0 = element("img");
    			t4 = space();
    			img1 = element("img");
    			t5 = space();
    			div3 = element("div");
    			div2 = element("div");
    			a0 = element("a");
    			a0.textContent = "React";
    			t7 = space();
    			a1 = element("a");
    			a1.textContent = "Angular";
    			t9 = space();
    			a2 = element("a");
    			a2.textContent = "Svelte";
    			t11 = space();
    			a3 = element("a");
    			a3.textContent = "Vue";
    			t13 = space();
    			a4 = element("a");
    			a4.textContent = "Ember";
    			t15 = space();
    			a5 = element("a");
    			a5.textContent = "jQuery";
    			t17 = space();
    			a6 = element("a");
    			a6.textContent = "Backbone";
    			t19 = space();
    			div7 = element("div");
    			span2 = element("span");
    			span1 = element("span");
    			t20 = space();
    			div6 = element("div");
    			div5 = element("div");
    			a7 = element("a");
    			span3 = element("span");
    			span3.textContent = "Ralph Largo | @devlargs";
    			t22 = space();
    			img2 = element("img");
    			t23 = space();
    			div11 = element("div");
    			div10 = element("div");
    			a8 = element("a");
    			a8.textContent = "React";
    			t25 = space();
    			a9 = element("a");
    			a9.textContent = "Angular";
    			t27 = space();
    			a10 = element("a");
    			a10.textContent = "Svelte";
    			t29 = space();
    			a11 = element("a");
    			a11.textContent = "Vue";
    			t31 = space();
    			a12 = element("a");
    			a12.textContent = "Ember";
    			t33 = space();
    			a13 = element("a");
    			a13.textContent = "jQuery";
    			t35 = space();
    			a14 = element("a");
    			a14.textContent = "Backbone";
    			t37 = space();
    			div17 = element("div");
    			div16 = element("div");
    			div15 = element("div");
    			div12 = element("div");
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			path4 = svg_element("path");
    			path5 = svg_element("path");
    			path6 = svg_element("path");
    			path7 = svg_element("path");
    			path8 = svg_element("path");
    			path9 = svg_element("path");
    			path10 = svg_element("path");
    			path11 = svg_element("path");
    			g = svg_element("g");
    			path12 = svg_element("path");
    			path13 = svg_element("path");
    			path14 = svg_element("path");
    			path15 = svg_element("path");
    			path16 = svg_element("path");
    			path17 = svg_element("path");
    			path18 = svg_element("path");
    			path19 = svg_element("path");
    			path20 = svg_element("path");
    			path21 = svg_element("path");
    			t38 = space();
    			h4 = element("h4");
    			h4.textContent = "React Todo list";
    			t40 = space();
    			div13 = element("div");
    			input0 = element("input");
    			t41 = space();
    			label = element("label");
    			span4 = element("span");
    			svg3 = svg_element("svg");
    			path22 = svg_element("path");
    			t42 = space();
    			input1 = element("input");
    			t43 = space();
    			form = element("form");
    			div14 = element("div");
    			svg4 = svg_element("svg");
    			path23 = svg_element("path");
    			t44 = space();
    			input2 = element("input");
    			t45 = space();
    			button1 = element("button");
    			t46 = text("Add");
    			attr_dev(span0, "class", "sr-only");
    			add_location(span0, file, 14, 14, 575);
    			attr_dev(path0, "strokelinecap", "round");
    			attr_dev(path0, "strokelinejoin", "round");
    			attr_dev(path0, "strokewidth", "2");
    			attr_dev(path0, "d", "M4 6h16M4 12h16M4 18h16");
    			add_location(path0, file, 24, 16, 897);
    			attr_dev(svg0, "class", "block h-6 w-6");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg0, "fill", "none");
    			attr_dev(svg0, "viewBox", "0 0 24 24");
    			attr_dev(svg0, "stroke", "currentColor");
    			attr_dev(svg0, "aria-hidden", "true");
    			add_location(svg0, file, 16, 14, 634);
    			attr_dev(path1, "strokelinecap", "round");
    			attr_dev(path1, "strokelinejoin", "round");
    			attr_dev(path1, "strokewidth", "2");
    			attr_dev(path1, "d", "M6 18L18 6M6 6l12 12");
    			add_location(path1, file, 40, 16, 1383);
    			attr_dev(svg1, "class", "hidden h-6 w-6");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg1, "fill", "none");
    			attr_dev(svg1, "viewBox", "0 0 24 24");
    			attr_dev(svg1, "stroke", "currentColor");
    			attr_dev(svg1, "aria-hidden", "true");
    			add_location(svg1, file, 32, 14, 1119);
    			attr_dev(button0, "class", "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white");
    			attr_dev(button0, "aria-expanded", "false");
    			add_location(button0, file, 10, 12, 311);
    			attr_dev(div0, "class", "absolute inset-y-0 left-0 flex items-center sm:hidden");
    			add_location(div0, file, 9, 10, 231);
    			attr_dev(img0, "class", "block lg:hidden h-8 w-auto");
    			if (img0.src !== (img0_src_value = "")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Workflow");
    			add_location(img0, file, 56, 14, 1920);
    			attr_dev(img1, "class", "hidden lg:block h-8 w-auto");
    			if (img1.src !== (img1_src_value = "")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "Todo list by @devlargs");
    			add_location(img1, file, 57, 14, 1999);
    			attr_dev(div1, "class", "flex-shrink-0 flex items-center logo-image");
    			attr_dev(div1, "onclick", ctx[1]);
    			add_location(div1, file, 52, 12, 1759);
    			attr_dev(a0, "href", "/react");
    			attr_dev(a0, "class", "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium");
    			add_location(a0, file, 65, 16, 2268);
    			attr_dev(a1, "href", "/angular");
    			attr_dev(a1, "class", "text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black");
    			add_location(a1, file, 71, 16, 2472);
    			attr_dev(a2, "href", "/angular");
    			attr_dev(a2, "class", "text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black");
    			add_location(a2, file, 77, 16, 2702);
    			attr_dev(a3, "href", "/vue");
    			attr_dev(a3, "class", "text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black");
    			add_location(a3, file, 83, 16, 2931);
    			attr_dev(a4, "href", "/ember");
    			attr_dev(a4, "class", "text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black");
    			add_location(a4, file, 89, 16, 3153);
    			attr_dev(a5, "href", "/jquery");
    			attr_dev(a5, "class", "text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black");
    			add_location(a5, file, 95, 16, 3379);
    			attr_dev(a6, "href", "/backbone");
    			attr_dev(a6, "class", "text-white px-3 py-2 rounded-md text-sm font-small hover:bg-gray-300 hover:text-black");
    			add_location(a6, file, 101, 16, 3607);
    			attr_dev(div2, "class", "flex space-x-4");
    			add_location(div2, file, 64, 14, 2223);
    			attr_dev(div3, "class", "hidden sm:block sm:ml-6");
    			add_location(div3, file, 63, 12, 2171);
    			attr_dev(div4, "class", "flex-1 flex items-center justify-center sm:items-stretch sm:justify-start");
    			add_location(div4, file, 49, 10, 1636);
    			attr_dev(span1, "class", "rounded-full border w-6 h-6 border-grey shadow-inner bg-blue-400 shadow");
    			add_location(span1, file, 120, 14, 4317);

    			attr_dev(span2, "classname", span2_classname_value = `border rounded-full border-grey flex items-center cursor-pointer w-12 ${/*light*/ ctx[0]
			? "bg-gray-200 justify-start"
			: "bg-gray-800 justify-end"}`);

    			attr_dev(span2, "onclick", ctx[2]);
    			add_location(span2, file, 114, 12, 4030);
    			attr_dev(span3, "class", "sr-only");
    			add_location(span3, file, 132, 18, 4753);
    			attr_dev(img2, "class", "h-8 w-8 rounded-full");
    			if (img2.src !== (img2_src_value = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Go to github page");
    			add_location(img2, file, 133, 18, 4824);
    			attr_dev(a7, "class", "bg-gray-800 flex text-sm rounded-full focus:outline-none");
    			attr_dev(a7, "href", "https://github.com/devlargs/todo-lists");
    			attr_dev(a7, "target", "_blank");
    			add_location(a7, file, 127, 16, 4533);
    			add_location(div5, file, 126, 14, 4511);
    			attr_dev(div6, "class", "ml-3 relative");
    			add_location(div6, file, 125, 12, 4469);
    			attr_dev(div7, "class", "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0");
    			add_location(div7, file, 111, 10, 3891);
    			attr_dev(div8, "class", "relative flex items-center justify-between h-16");
    			add_location(div8, file, 8, 8, 159);
    			attr_dev(div9, "class", "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8");
    			add_location(div9, file, 7, 6, 98);
    			attr_dev(a8, "href", "/react");
    			attr_dev(a8, "class", "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium");
    			add_location(a8, file, 147, 10, 5237);
    			attr_dev(a9, "href", "/angular");
    			attr_dev(a9, "class", "text-white block px-3 py-2 rounded-md text-base font-small");
    			add_location(a9, file, 153, 10, 5413);
    			attr_dev(a10, "href", "/svelte");
    			attr_dev(a10, "class", "text-white block px-3 py-2 rounded-md text-base font-small");
    			add_location(a10, file, 159, 10, 5580);
    			attr_dev(a11, "href", "/vue");
    			attr_dev(a11, "class", "text-white block px-3 py-2 rounded-md text-base font-smallm");
    			add_location(a11, file, 165, 10, 5745);
    			attr_dev(a12, "href", "/ember");
    			attr_dev(a12, "class", "text-white block px-3 py-2 rounded-md text-base font-small");
    			add_location(a12, file, 171, 10, 5905);
    			attr_dev(a13, "href", "/jquery");
    			attr_dev(a13, "class", "text-white block px-3 py-2 rounded-md text-base font-small");
    			add_location(a13, file, 177, 10, 6068);
    			attr_dev(a14, "href", "/backbone");
    			attr_dev(a14, "class", "text-white block px-3 py-2 rounded-md text-base font-small");
    			add_location(a14, file, 183, 10, 6233);
    			attr_dev(div10, "class", "px-2 pt-2 pb-3 space-y-1");
    			add_location(div10, file, 146, 8, 5188);
    			attr_dev(div11, "class", "sm:hidden");
    			add_location(div11, file, 145, 6, 5156);
    			attr_dev(nav, "class", "bg-gray-800");
    			add_location(nav, file, 6, 4, 66);
    			attr_dev(path2, "d", "m50 61h-47v-58h37l10 10z");
    			attr_dev(path2, "fill", "#50b6cf");
    			add_location(path2, file, 215, 14, 7160);
    			attr_dev(path3, "d", "m50 13h-10v-10z");
    			attr_dev(path3, "fill", "#3cadc9");
    			add_location(path3, file, 216, 14, 7227);
    			attr_dev(path4, "d", "m8 49h8v8h-8z");
    			attr_dev(path4, "fill", "#ded8d0");
    			add_location(path4, file, 217, 14, 7285);
    			attr_dev(path5, "d", "m8 36h8v8h-8z");
    			attr_dev(path5, "fill", "#ded8d0");
    			add_location(path5, file, 218, 14, 7341);
    			attr_dev(path6, "d", "m8 23h8v8h-8z");
    			attr_dev(path6, "fill", "#ded8d0");
    			add_location(path6, file, 219, 14, 7397);
    			attr_dev(path7, "d", "m8 10h8v8h-8z");
    			attr_dev(path7, "fill", "#ded8d0");
    			add_location(path7, file, 220, 14, 7453);
    			attr_dev(path8, "d", "m25 38 32-32 4 4-32 32-6 2z");
    			attr_dev(path8, "fill", "#f5a947");
    			add_location(path8, file, 221, 14, 7509);
    			attr_dev(path9, "d", "m50 35c-5 10-28.15985 23.39606-47 23.95081v2.04919h47z");
    			attr_dev(path9, "fill", "#3cadc9");
    			add_location(path9, file, 222, 14, 7579);
    			attr_dev(path10, "d", "m29 42 32-32-1.5-1.5-35 35z");
    			attr_dev(path10, "fill", "#f09d3a");
    			add_location(path10, file, 226, 14, 7722);
    			attr_dev(path11, "d", "m25 38 4 4-6 2z");
    			attr_dev(path11, "fill", "#e34e4b");
    			add_location(path11, file, 227, 14, 7792);
    			attr_dev(path12, "d", "m8 19h8c.55225 0 1-.44775 1-1v-3h-2v2h-6v-6h3v-2h-4c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1z");
    			add_location(path12, file, 229, 16, 7885);
    			attr_dev(path13, "d", "m12 13.58594-1.29297-1.29297-1.41406 1.41406 2 2c.19531.19531.45117.29297.70703.29297s.51172-.09766.70703-.29297l6-6-1.41406-1.41406z");
    			add_location(path13, file, 232, 16, 8047);
    			attr_dev(path14, "d", "m15 30h-6v-6h3v-2h-4c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1h8c.55225 0 1-.44775 1-1v-3h-2z");
    			add_location(path14, file, 235, 16, 8244);
    			attr_dev(path15, "d", "m12 26.58594-1.29297-1.29297-1.41406 1.41406 2 2c.19531.19531.45117.29297.70703.29297s.51172-.09766.70703-.29297l6-6-1.41406-1.41406z");
    			add_location(path15, file, 238, 16, 8405);
    			attr_dev(path16, "d", "m16 35h-8c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1h8c.55225 0 1-.44775 1-1v-8c0-.55225-.44775-1-1-1zm-1 8h-6v-6h6z");
    			add_location(path16, file, 241, 16, 8602);
    			attr_dev(path17, "d", "m16 48h-8c-.55225 0-1 .44775-1 1v8c0 .55225.44775 1 1 1h8c.55225 0 1-.44775 1-1v-8c0-.55225-.44775-1-1-1zm-1 8h-6v-6h6z");
    			add_location(path17, file, 244, 16, 8785);
    			attr_dev(path18, "d", "m57.70703 5.29297c-.39062-.39062-1.02344-.39062-1.41406 0l-6.29297 6.29297-9.29297-9.29297c-.1875-.1875-.44189-.29297-.70703-.29297h-37c-.55225 0-1 .44775-1 1v58c0 .55225.44775 1 1 1h47c.55225 0 1-.44775 1-1v-39.58594l10.70703-10.70703c.39062-.39062.39062-1.02344 0-1.41406zm-8.70703 54.70703h-45v-56h35.58594l8 8h-6.58594v-5h-2v6c0 .55225.44775 1 1 1h7.58594l-23.29297 23.29297c-.10986.10986-.19238.24365-.2417.39062l-2 6c-.11963.35938-.02637.75586.2417 1.02344.19043.19092.44629.29297.70703.29297.10596 0 .2124-.0166.31641-.05127l6-2c.14697-.04932.28076-.13184.39062-.2417l19.29297-19.29297zm-23.56299-20.14893 1.71191 1.71191-2.56787.85596zm3.56299.73487-2.58594-2.58594 30.58594-30.58594 2.58594 2.58594z");
    			add_location(path18, file, 247, 16, 8968);
    			attr_dev(path19, "d", "m45 56h2v2h-2z");
    			add_location(path19, file, 250, 16, 9740);
    			attr_dev(path20, "d", "m41 56h2v2h-2z");
    			add_location(path20, file, 251, 16, 9784);
    			attr_dev(path21, "d", "m37 56h2v2h-2z");
    			add_location(path21, file, 252, 16, 9828);
    			attr_dev(g, "fill", "#0d0f23");
    			add_location(g, file, 228, 14, 7850);
    			attr_dev(svg2, "id", "Layer_1_1_");
    			attr_dev(svg2, "enablebackground", "new 0 0 64 64");
    			attr_dev(svg2, "height", "40");
    			attr_dev(svg2, "viewBox", "0 0 64 64");
    			attr_dev(svg2, "width", "40");
    			attr_dev(svg2, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg2, file, 207, 12, 6916);
    			attr_dev(h4, "class", "font-semibold ml-3 text-lg mr-3");
    			add_location(h4, file, 256, 12, 9907);
    			attr_dev(div12, "class", "flex items-center mb-6");
    			add_location(div12, file, 206, 10, 6867);
    			attr_dev(input0, "class", "hidden");
    			attr_dev(input0, "type", "checkbox");
    			attr_dev(input0, "id", "task_10");
    			add_location(input0, file, 260, 12, 10018);
    			attr_dev(path22, "fillrule", "evenodd");
    			attr_dev(path22, "d", "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z");
    			attr_dev(path22, "cliprule", "evenodd");
    			add_location(path22, file, 276, 18, 10684);
    			attr_dev(svg3, "class", "w-4 h-4 fill-current");
    			attr_dev(svg3, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg3, "viewBox", "0 0 20 20");
    			attr_dev(svg3, "fill", "currentColor");
    			add_location(svg3, file, 270, 16, 10467);
    			attr_dev(span4, "class", "flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full");
    			add_location(span4, file, 267, 14, 10309);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "bg-transparent pl-4 text-sm focus:outline-none ");
    			attr_dev(input1, "defaultvalue", "Be all round legend");
    			add_location(input1, file, 284, 14, 10988);
    			attr_dev(label, "classname", label_classname_value = `flex items-center h-10 px-2 rounded cursor-pointer hover:${/*light*/ ctx[0] ? "bg-gray-300" : "bg-gray-900"}`);
    			attr_dev(label, "htmlfor", "task_10");
    			add_location(label, file, 261, 12, 10084);
    			add_location(div13, file, 259, 10, 10000);
    			attr_dev(path23, "strokelinecap", "round");
    			attr_dev(path23, "strokelinejoin", "round");
    			attr_dev(path23, "strokewidth", "2");
    			attr_dev(path23, "d", "M12 6v6m0 0v6m0-6h6m-6 0H6");
    			add_location(path23, file, 303, 16, 11602);
    			attr_dev(svg4, "class", "w-5 h-5 text-gray-400 fill-current");
    			attr_dev(svg4, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg4, "fill", "none");
    			attr_dev(svg4, "viewBox", "0 0 24 24");
    			attr_dev(svg4, "stroke", "currentColor");
    			add_location(svg4, file, 296, 14, 11353);
    			input2.required = true;
    			attr_dev(input2, "class", "flex-grow h-8 ml-3 bg-transparent focus:outline-none font-medium");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "placeholder", "Add a new task");
    			add_location(input2, file, 310, 14, 11826);

    			attr_dev(button1, "classname", button1_classname_value = `pl-2 pr-2 pt-1 pb-1 rounded-sm focus:outline-none ${/*light*/ ctx[0]
			? "hover:bg-gray-200 bg-gray-300 text-gray-900"
			: "hover:bg-gray-700 bg-gray-900"}`);

    			add_location(button1, file, 316, 14, 12051);
    			attr_dev(div14, "class", "flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded");
    			add_location(div14, file, 293, 12, 11231);
    			add_location(form, file, 292, 10, 11212);
    			attr_dev(div15, "classname", div15_classname_value = `max-w-full p-8 rounded-lg shadow-lg w-96 ${/*light*/ ctx[0] ? "bg-white" : "bg-gray-800 text-white"}`);
    			add_location(div15, file, 201, 8, 6704);
    			attr_dev(div16, "classname", div16_classname_value = `flex flex-grow items-center justify-center h-full text-gray-600 ${/*light*/ ctx[0] ? "bg-gray-100" : "bg-gray-900"}`);
    			add_location(div16, file, 196, 6, 6536);
    			attr_dev(div17, "class", "flex items-center justify-center w-screen font-medium main-container");
    			add_location(div17, file, 193, 4, 6436);
    			add_location(div18, file, 5, 2, 56);
    			attr_dev(main, "class", "svelte-1e9puaw");
    			add_location(main, file, 4, 0, 47);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div18);
    			append_dev(div18, nav);
    			append_dev(nav, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div0);
    			append_dev(div0, button0);
    			append_dev(button0, span0);
    			append_dev(button0, t1);
    			append_dev(button0, svg0);
    			append_dev(svg0, path0);
    			append_dev(button0, t2);
    			append_dev(button0, svg1);
    			append_dev(svg1, path1);
    			append_dev(div8, t3);
    			append_dev(div8, div4);
    			append_dev(div4, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t4);
    			append_dev(div1, img1);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, a0);
    			append_dev(div2, t7);
    			append_dev(div2, a1);
    			append_dev(div2, t9);
    			append_dev(div2, a2);
    			append_dev(div2, t11);
    			append_dev(div2, a3);
    			append_dev(div2, t13);
    			append_dev(div2, a4);
    			append_dev(div2, t15);
    			append_dev(div2, a5);
    			append_dev(div2, t17);
    			append_dev(div2, a6);
    			append_dev(div8, t19);
    			append_dev(div8, div7);
    			append_dev(div7, span2);
    			append_dev(span2, span1);
    			append_dev(div7, t20);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, a7);
    			append_dev(a7, span3);
    			append_dev(a7, t22);
    			append_dev(a7, img2);
    			append_dev(nav, t23);
    			append_dev(nav, div11);
    			append_dev(div11, div10);
    			append_dev(div10, a8);
    			append_dev(div10, t25);
    			append_dev(div10, a9);
    			append_dev(div10, t27);
    			append_dev(div10, a10);
    			append_dev(div10, t29);
    			append_dev(div10, a11);
    			append_dev(div10, t31);
    			append_dev(div10, a12);
    			append_dev(div10, t33);
    			append_dev(div10, a13);
    			append_dev(div10, t35);
    			append_dev(div10, a14);
    			append_dev(div18, t37);
    			append_dev(div18, div17);
    			append_dev(div17, div16);
    			append_dev(div16, div15);
    			append_dev(div15, div12);
    			append_dev(div12, svg2);
    			append_dev(svg2, path2);
    			append_dev(svg2, path3);
    			append_dev(svg2, path4);
    			append_dev(svg2, path5);
    			append_dev(svg2, path6);
    			append_dev(svg2, path7);
    			append_dev(svg2, path8);
    			append_dev(svg2, path9);
    			append_dev(svg2, path10);
    			append_dev(svg2, path11);
    			append_dev(svg2, g);
    			append_dev(g, path12);
    			append_dev(g, path13);
    			append_dev(g, path14);
    			append_dev(g, path15);
    			append_dev(g, path16);
    			append_dev(g, path17);
    			append_dev(g, path18);
    			append_dev(g, path19);
    			append_dev(g, path20);
    			append_dev(g, path21);
    			append_dev(div12, t38);
    			append_dev(div12, h4);
    			append_dev(div15, t40);
    			append_dev(div15, div13);
    			append_dev(div13, input0);
    			append_dev(div13, t41);
    			append_dev(div13, label);
    			append_dev(label, span4);
    			append_dev(span4, svg3);
    			append_dev(svg3, path22);
    			append_dev(label, t42);
    			append_dev(label, input1);
    			append_dev(div15, t43);
    			append_dev(div15, form);
    			append_dev(form, div14);
    			append_dev(div14, svg4);
    			append_dev(svg4, path23);
    			append_dev(div14, t44);
    			append_dev(div14, input2);
    			append_dev(div14, t45);
    			append_dev(div14, button1);
    			append_dev(button1, t46);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*light*/ 1 && span2_classname_value !== (span2_classname_value = `border rounded-full border-grey flex items-center cursor-pointer w-12 ${/*light*/ ctx[0]
			? "bg-gray-200 justify-start"
			: "bg-gray-800 justify-end"}`)) {
    				attr_dev(span2, "classname", span2_classname_value);
    			}

    			if (dirty & /*light*/ 1 && label_classname_value !== (label_classname_value = `flex items-center h-10 px-2 rounded cursor-pointer hover:${/*light*/ ctx[0] ? "bg-gray-300" : "bg-gray-900"}`)) {
    				attr_dev(label, "classname", label_classname_value);
    			}

    			if (dirty & /*light*/ 1 && button1_classname_value !== (button1_classname_value = `pl-2 pr-2 pt-1 pb-1 rounded-sm focus:outline-none ${/*light*/ ctx[0]
			? "hover:bg-gray-200 bg-gray-300 text-gray-900"
			: "hover:bg-gray-700 bg-gray-900"}`)) {
    				attr_dev(button1, "classname", button1_classname_value);
    			}

    			if (dirty & /*light*/ 1 && div15_classname_value !== (div15_classname_value = `max-w-full p-8 rounded-lg shadow-lg w-96 ${/*light*/ ctx[0] ? "bg-white" : "bg-gray-800 text-white"}`)) {
    				attr_dev(div15, "classname", div15_classname_value);
    			}

    			if (dirty & /*light*/ 1 && div16_classname_value !== (div16_classname_value = `flex flex-grow items-center justify-center h-full text-gray-600 ${/*light*/ ctx[0] ? "bg-gray-100" : "bg-gray-900"}`)) {
    				attr_dev(div16, "classname", div16_classname_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let { light = true } = $$props;
    	const writable_props = ["light"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const func = () => window.location.pathname = "/";
    	const func_1 = () => setLight(prev => !prev);

    	$$self.$$set = $$props => {
    		if ("light" in $$props) $$invalidate(0, light = $$props.light);
    	};

    	$$self.$capture_state = () => ({ light });

    	$$self.$inject_state = $$props => {
    		if ("light" in $$props) $$invalidate(0, light = $$props.light);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [light, func, func_1];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { light: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get light() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
