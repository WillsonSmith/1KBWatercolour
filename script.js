var app = (function(){

  'use strict';

  return {

    lastName: null,
    getData: function(method, location){

      var req = new XMLHttpRequest(),
          res;

      req.open(method, location + this.lastName, false);
			req.send();

      if (req.status === 200){

        res = req.responseText;

      }

      return JSON.parse(res).data.children;


    },

    clone: function(el, data){
      //console.log(data);
      var sparse = document.createDocumentFragment(),
      last,
      nw,
      src,
      chk;

      for (var i = 0; i < data.length; i++){

        nw = document.createElement('img');
        src = data[i].data.body;
        chk = src.match(/(http:\/\/i.imgur.com\/(.*))(\?.*)?/);
        if (chk && src !== last){
          nw.src = chk;
          sparse.appendChild(nw);
        }
        last = src;
        //console.log(src);
        this.lastName = data[i].data.name;


      }
      el.appendChild(sparse);

    }

  };

})();

//console.log(app.getData('GET', 'http://www.reddit.com/user/Shitty_Watercolour/comments.json').respond());
var url = 'http://www.reddit.com/user/Shitty_Watercolour/comments.json?after=';
var dat = app.getData('GET', url);
var el = document.getElementById('images');
app.clone(el, dat);

window.onscroll = function(){

  var ph = document.documentElement.scrollHeight,
      sp = window.pageYOffset,
      ch = document.documentElement.clientHeight;

      if (ph - (sp + ch) < 50){

        app.clone(el, app.getData('GET', url));

      }

};
