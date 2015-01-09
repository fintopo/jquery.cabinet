$(function() {
  var backup_params;
  var options = {
    onMouseDown: function(){
      var $this = $(this);
      // マウスの動きに追随させるため、transition-duration を一旦 0 にする
      backup_params = {
        'transition-duration': $this.css('transition-duration')
      };
      var params = {
        'transition-duration': '0'
      };
      $this.css(params);
    }
    ,onMouseUp: function(){
      var $this = $(this);
      // 保存した値を戻す
      $this.css(backup_params);
    }
  };
  //
  $('.cabinet-left').cabinet($.extend({
    width: 300
    ,mode: 'position'
  }, options));
  //
  $('.cabinet-top').cabinet($.extend({
    position: 'top'
    ,height: 100
    ,mode: 'position'
    ,drawers: [{
      knob: '<p>position</p>'
      ,box: '<p><code>left</code> or <code>right</code> or <code>top</code> or <code>bottom</code></p><p>This option refers to the direction of slide.</p>'
    },{
      knob: '<p>mode</p>'
      ,box: '<p><code>width</code> or <code>position</code></p><p>This option refers to the method of slide.</p>'
    },{
      knob: '<p>drawers</p>'
      ,box: '<p>In addition to the drawer that was written in HTML, you can add a drawer in this option. And there are methods of additional or remove.</p>'
    }]
  }, options));
  //
  $('.cabinet-right').cabinet($.extend({
    position: 'right'
    ,width: 300
    ,mode: 'width'
  }, options));
  $('.cabinet-right').cabinet('appendDrawers', [{
    knob: '<p>appendDrawers</p>'
    ,box: '<h3>appendDrawers</h3><p>This method adds drawers.</p>'
  },{
    knob: '<p>removeDrawer</p>'
    ,box: '<h3>removeDrawer</h3><p>This method removes a drawer.</p>'
  },{
    knob: '<p>getDrawer</p>'
    ,box: '<h3>getDrawer</h3><p>This method get a drawer-box.</p>'
  }]);
  //
  $('.cabinet-bottom').cabinet($.extend({
    position: 'bottom'
    ,height: 100
    ,mode: 'width'
  }, options));
  $('.cabinet-bottom').cabinet('getDrawer', 0).html('<p>jquery.cabinet is released under the MIT license.</p>');
  $('.cabinet-bottom').cabinet('getDrawer', 1).html('<p>create by <a href="http://www.fintopo.jp/">fintopo</a></p>');
  $('.cabinet-bottom').cabinet('removeDrawer', 2);
});