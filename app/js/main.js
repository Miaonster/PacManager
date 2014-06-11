'use strict';

require('string_score');

//var sprintf = require('sprintf');

define(function (require) {
  var file = require('data');

  function showList(data) {
    var template;

    data = data || file.domains;

    data = { keys: data };

    template = $('.js-tpl-li').html();
    template = _.template(template, data);

    $('.js-pac-list').empty().append(template);
  }

  function initDom() {
    $('.search').on('keyup', function (e) {
      var data,
          $this = $(this),
          value = $this.val();

      if (e.keyCode === 13) {
        file.addDomain(value);
        showList(file.domains);
        $this.val('');
      } else if (e.keyCode === 27) {
        $this.val('');
        showList();
      } else {
        data = file.domains
          .filter(function (element) {
            return element.indexOf(value) !== -1;
          })
          .sort(function (a, b) {
            return b.score(value) - a.score(value);
          });

        showList(data);
      }
    });

    $('.pac-list').on('click', '.icon-rm', function () {
      file.rmDomain($(this).parent().text());
      showList();
    });

    $('.icon').on('click', function () {
      if (!$('.search').val()) {
      } else {
        $('.search').focus();
      }
    });

    $('.file').on('click', function () {
    });
  }

  file.init();
  initDom();

  showList(file.domains);
});
