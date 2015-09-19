/*
 * jquery.cabinet Ver.1.3.0 (2015-05-06)
 * https://github.com/fintopo/jquery.cabinet
 * 
 * by fintopo(http://www.fintopo.jp/)
 */

(function($) {
  'use strict';

  var namespace = 'cabinet';

  // 全ての引き出しを閉じる
  var close_drawers = function($cabinet, options){
    $cabinet.find('.cabinet-drawer')
        .removeClass(options.classDrawerOpen)
        .addClass(options.classDrawerClose);
    //
    var mode_hide = true;
    switch(options.position) {
    case 'top':
    case 'bottom':
      mode_hide = (options.closeHeight == 0);
      break;
    case 'right':
    case 'left':
      mode_hide = (options.closeWidth == 0);
      break;
    }
    if (mode_hide) {
      $cabinet.find('.cabinet-box').hide();
    }
  };
  // 引き出しの切り替え
  var switch_drawer = function($cabinet, $knob, options){
    var old_drawer = $cabinet.find('.cabinet-drawer.'+options.classDrawerOpen).index();
    var new_drawer = $cabinet.find('.cabinet-knob').index($knob);
    //
    close_drawers($cabinet, options);
    $cabinet.find('.cabinet-drawer:eq('+new_drawer+')')
        .removeClass(options.classDrawerClose)
        .addClass(options.classDrawerOpen);
    $cabinet.find('.cabinet-box:eq('+new_drawer+')').show();
    //
    return $cabinet.hasClass(options.classOpen) && (new_drawer != old_drawer);
  };
  //
  var add_knob_events = function($knob){
    var _this = this;
    var $this = $(this);
    $knob.mousedown(function(e) {
      var options = $this.data(namespace).options;
      var mx = e.pageX;
      var my = e.pageY;
      //
      var hold_drawer = switch_drawer($this, this, options);
      //
      if (typeof options.onMouseDown == 'function') {
        options.onMouseDown.call($this, mx, my);
      }
      //
      $(document).on('mousemove.'+namespace, function(e) {
        var params = {};
        var f_close = false;
        switch (options.mode) {
        case 'position':
          var width, height;
          switch(options.position) {
          case 'top':
            var top = Number($this.css('top').replace('px', ''));
            height = Number($this.css('height').replace('px', ''));
            if (height > options.height) {
              top += (height - options.height);
            }
            params.top = top - my + e.pageY;
            params.height = options.height;
            if ((options.height + params.top) <= options.minSize) {
              f_close = true;
              params.top = options.closeHeight - options.height;
            } else if (params.top > 0) {
              params.height += params.top;
              params.top = 0;
            }
            break;
          case 'bottom':
            var bottom = Number($this.css('bottom').replace('px', ''));
            height = Number($this.css('height').replace('px', ''));
            if (height > options.height) {
              bottom += (height - options.height);
            }
            params.bottom = bottom + my - e.pageY;
            params.height = options.height;
            if ((options.height + params.bottom) <= options.minSize) {
              f_close = true;
              params.bottom = options.closeHeight - options.height;
            } else if (params.bottom > 0) {
              params.height += params.bottom;
              params.bottom = 0;
            }
            break;
          case 'right':
            var right = Number($this.css('right').replace('px', ''));
            width = Number($this.css('width').replace('px', ''));
            if (width > options.width) {
              right += (width - options.width);
            }
            params.right = right + mx - e.pageX;
            params.width = options.width;
            if ((options.width + params.right) <= options.minSize) {
              f_close = true;
              params.right = options.closeWidth - options.width;
            } else if (params.right > 0) {
              params.width += params.right;
              params.right = 0;
            }
            break;
          case 'left':
            var left = Number($this.css('left').replace('px', ''));
            width = Number($this.css('width').replace('px', ''));
            if (width > options.width) {
              left += (width - options.width);
            }
            params.left = left - mx + e.pageX;
            params.width = options.width;
            if ((options.width + params.left) <= options.minSize) {
              f_close = true;
              params.left = options.closeWidth - options.width;
            } else if (params.left > 0) {
              params.width += params.left;
              params.left = 0;
            }
          }
          break;
        default: // mode:width
          switch(options.position) {
          case 'top':
            params.height =   ( $this.height() - my ) + e.pageY;
            if (params.height <= (options.closeHeight + options.minSize)) {
              f_close = true;
              params.height = options.closeHeight;
            }
            break;
          case 'bottom':
            params.height = $this.height() + my - e.pageY;
            if (params.height <= (options.closeHeight + options.minSize)) {
              f_close = true;
              params.height = options.closeHeight;
            }
            break;
          case 'right':
            params.width = $this.width() + mx - e.pageX;
            if (params.width <= (options.closeWidth + options.minSize)) {
              f_close = true;
              params.width = options.closeWidth;
            }
            break;
          case 'left':
            params.width =   ( $this.width() - mx ) + e.pageX;
            if (params.width <= (options.closeWidth + options.minSize)) {
              f_close = true;
              params.width = options.closeWidth;
            }
          }
        }
        //
        $this.removeClass(options.classExpand);
        if (f_close) {
          $this
              .removeClass(options.classOpen)
              .addClass(options.classClose);
        } else {
          $this
              .removeClass(options.classClose)
              .addClass(options.classOpen);
          //
          var f_expand;
          switch (options.position) {
          case 'top':
          case 'bottom':
            f_expand = (params.height > options.height);
          default:
            f_expand = (params.width > options.width);
          }
          if (f_expand) {
            $this.addClass(options.classExpand);
          }
        }
        $this.css(params);
        mx = e.pageX;
        my = e.pageY;
        return false;
      }).one('mouseup', function() {
        $(document).off('mousemove.'+namespace);
        //
        if (typeof options.onMouseUp == 'function') {
          options.onMouseUp.call($this);
        }
        //
        if ((mx == e.pageX) && (my == e.pageY) && !hold_drawer) {
          // click
          methods.toggle.apply(_this);
        }
      });
      return false;
    });
  };
  //
  var methods = {
    init: function(options){
      options = $.extend({
        position: 'left'
        ,open: false
        ,minSize: 10
        ,closeWidth: 0
        ,closeHeight: 0
        ,classOpen: 'cabinet-open'
        ,classClose: 'cabinet-close'
        ,classExpand: 'cabinet-expand'
        ,classDrawerOpen: 'drawer-open'
        ,classDrawerClose: 'drawer-close'
        ,mode: 'position'
        ,onOpen: null
        ,onBeforeOpen: null
        ,onClose: null
        ,onBeforeClose: null
        ,onMouseDown: null
        ,onMouseUp: null
        ,drawers: null
      }, options);
      //
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({
            width: $this.data('width'),
            height: $this.data('height')
          }, options);
          $this.data(namespace, {
            options: options
          });
          $this.addClass('cabinet');
          //
          add_knob_events.call(_this, $this.find('.cabinet-knob'));
          //
          methods.appendDrawers.call(_this, options.drawers);
          //
          if (options.open || (options.open === 0)) {
            methods.open.call(_this, options);
          } else {
            methods.close.call(_this, options);
          }
        }
      }); // end each
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    }
    ,isOpen: function(){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      var options = data.options;
      return $this.hasClass(options.classOpen);
    }
    ,toggle: function(){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      var options = data.options;
      var method = ($this.hasClass(options.classOpen)) ? 'close' : 'open';
      methods[method].apply(this);
      return method;
    }
    ,open: function(options){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      options = $.extend(data.options, options);
      //
      if (typeof options.onBeforeOpen == 'function') {
        options.onBeforeOpen.call(this);
      }
      //
      var params = {};
      switch (options.mode) {
      case 'position':
        params[options.position] = 0;
        switch(options.position) {
        case 'top':
        case 'bottom':
          params.height = options.height;
          break;
        case 'right':
        case 'left':
          params.width = options.width;
        }
        break;
      default: // mode: width
        switch(options.position) {
        case 'top':
        case 'bottom':
          params.height = options.height;
          break;
        case 'right':
        case 'left':
          params.width = options.width;
        }
      }            
      $this
          .css(params)
          .removeClass(options.classClose)
          .addClass(options.classOpen)
          .removeClass(options.classExpand);
      //
      if ($this.find('.cabinet-drawer.'+options.classDrawerOpen).length == 0) { // クリックでオープンした時は、既にクラスが付いているので変更しない。
        var index = (toString.call(options.open) == '[object Number]') ? options.open : 0;
        switch_drawer($this, $this.find('.cabinet-knob:eq('+index+')'), options);
      }
      //
      if (typeof options.onOpen == 'function') {
        options.onOpen.call(this);
      }
    },
    close: function(options){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      options = $.extend(data.options, options);
      //
      if (typeof options.onBeforeClose == 'function') {
        options.onBeforeClose.call(this);
      }
      //
      var params = {};
      switch (options.mode) {
      case 'position':
        switch(options.position) {
        case 'top':
          params.top = options.closeHeight - options.height;
          params.height = options.height;
          break;
        case 'bottom':
          params.bottom = options.closeHeight - options.height;
          params.height = options.height;
          break;
        case 'right':
          params.right = options.closeWidth - options.width;
          params.width = options.width;
          break;
        case 'left':
          params.left = options.closeWidth - options.width;
          params.width = options.width;
          break;
        }
        break;
      default:
        switch(options.position) {
        case 'top':
        case 'bottom':
          params.height = options.closeHeight;
          break;
        case 'right':
        case 'left':
          params.width = options.closeWidth;
          break;
        }
      }
      $this
          .css(params)
          .removeClass(options.classOpen)
          .addClass(options.classClose)
          .removeClass(options.classExpand);
      close_drawers($this, options);
      //
      if (typeof options.onClose == 'function') {
        options.onClose.call(this);
      }
    }
    ,reset: function(options){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      return $.extend(data.options, options);
    }
    ,countDrawers: function(options){
      return $(this).find('.cabinet-drawer').length;
    }
    ,appendDrawers: function(options){
      var _this = this;
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      if (!options) return;
      options = $.extend({
        drawers: ($.isArray(options)) ? options : []
        ,open: false
        ,remove: null
      }, options);
      //
      if (options.remove === true) {
        methods.removeDrawers.call(this);
      } else if (toString.call(options.remove) == '[object Number]') {
        methods.removeDrawer.call(this, options.remove);
      }
      //
      $.each(options.drawers, function(index, drawer){
        var $knob = $('<div>').addClass('cabinet-knob').append(drawer.knob);
        var $box = $('<div>').addClass('cabinet-box').append(drawer.box);
        var $drawer = $('<div>')
            .addClass('cabinet-drawer')
            .append($knob)
            .append($box);
        $this.append($drawer);
        add_knob_events.call(_this, $knob);
      });
      //
      if (options.open || (options.open === 0)) {
        methods.open.call(_this, options);
      }
      //
      return methods.countDrawers.call(_this);
    }
    ,removeDrawers: function(){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      $this.find('.cabinet-drawer').remove();
    }
    ,removeDrawer: function(index){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      $this.find('.cabinet-drawer:eq('+index+')').remove();
      //
      return methods.countDrawers.call(this);
    }
    ,getDrawer: function(index){
      var $this = $(this);
      var data = $this.data(namespace);
      if (!data) return;
      //
      return $this.find('.cabinet-box:eq('+index+')');
    }
  };
  $.fn.cabinet = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);
