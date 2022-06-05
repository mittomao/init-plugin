import JpConsumerBase from './JpConsumeBase.js';

function PaginationConsumer($el, options) {
  const _self = this;
  _self._renderPaginationTemplate = _renderPaginationTemplate.bind(_self);
  _self._isMobile = _isMobile();
  _self._selector = _selector.bind(_self);
  _self._handleShowPagination = _handleShowPagination.bind(_self);
  _self._handleShowPaginationMobile = _handleShowPaginationMobile.bind(_self);
  _self._handleShowPaginationDesktop = _handleShowPaginationDesktop.bind(_self);

  JpConsumerBase.call(_self, $el, options);

  const PAGINATION = {
    numberLimitedDesktop: 6,
    numberLimitedMobile: 4,
  };

  _self.PAGINATION = PAGINATION;

  _self.$jsListingPagination = _self.$el.find('.js-listing-pagination');

  _self.$jsListingPagination.html(_self._renderPaginationTemplate());

  _self.$buttonNumber = _self.$el.find('.js-button-number');
  _self.$buttonNumberChange = _self.$el.find('.js-button-number.change');
  _self.$buttonPrevious = _self.$el.find('.js-button-previous');
  _self.$buttonNext = _self.$el.find('.js-button-next');
  _self.$buttonNumber = _self.$el.find('.js-button-number');
  _self.$showBottomText = _self.$el.find('.js-bottom-text');

  _self.$buttonNext.on('click', function () {
    const action = { type: 'NEXT_PAGE' };
    _self.dispatch(action);
  });

  _self.$buttonPrevious.on('click', function () {
    const action = { type: 'PREV_PAGE' };
    _self.dispatch(action);
  });

  _self.$buttonNumber.on('click', function () {
    const value = parseInt($(this).text());
    const action = { type: 'NUMBER_PAGE', page: value };
    _self.dispatch(action);
  });

  _self.useState({ pageIndex: 1, totalPaging: 9 });

  _self.useSelector(_self._selector);

  function _selector(state) {
    return { isLoading: state.isLoading, pageIndex: state.page,
      totalPaging: state.pageCount, itemCount: state.itemCount, pageSize: state.pageSize };
  }

  function _renderPaginationTemplate() {
    return `
        <a href="javascript:void(0)" class="button-previous js-button-previous no-pointer">
          <i class="icon-arrow-prev"></i>
        </a>
        <a href="javascript:void(0)" class="button-number js-button-number">1</a>
        <a href="javascript:void(0)" class="button-number js-button-number change">2</a>
        <a href="javascript:void(0)" class="button-number js-button-number change">3</a>
        <a href="javascript:void(0)" class="button-number js-button-number change">4</a>
        <a href="javascript:void(0)" class="button-number js-button-number change hidden">5</a>
        <a href="javascript:void(0)" class="button-number js-button-number change no-pointer">...</a>
        <a href="javascript:void(0)" class="button-number js-button-number">9</a>
        <a href="javascript:void(0)" class="button-next js-button-next">
          <i class="icon-arrow-next"></i>
        </a>
      `;
  }

  function _isMobile() {
    return window.innerWidth < 768;
  }

  function _handleShowPagination() {
    if (_self._isMobile) {
      _self._handleShowPaginationMobile();
    } else {
      _self._handleShowPaginationDesktop();
    }
  }

  function _handleShowPaginationMobile() {
    _self.$buttonNumber.removeClass('is-activated');
    const state = _self.getState();
    const pageIndex = state.pageIndex;
    const totalPaging = state.totalPaging;

    if (pageIndex <= 2) {
      _self.$buttonNext.removeClass('no-pointer');
      if (pageIndex === 1) {
        _self.$buttonPrevious.addClass('no-pointer');
      } else {
        _self.$buttonPrevious.removeClass('no-pointer');
      }

      $(_self.$buttonNumber[pageIndex - 1]).addClass('is-activated');
      $(_self.$buttonNumberChange[0]).html(2).removeClass('no-pointer');
      $(_self.$buttonNumberChange[1]).html(3).addClass('hidden');
      $(_self.$buttonNumberChange[2]).html(4).addClass('hidden');
      $(_self.$buttonNumberChange[3]).html(5).addClass('hidden');
      $(_self.$buttonNumberChange[4]).html('...').addClass('no-pointer');
    }
    else if (totalPaging - 1 <= pageIndex && pageIndex <= totalPaging) {
      _self.$buttonPrevious.removeClass('no-pointer');
      if (pageIndex === totalPaging) {
        _self.$buttonNext.addClass('no-pointer');
        $(_self.$buttonNumber[6]).addClass('is-activated');
      } else {
        _self.$buttonNext.removeClass('no-pointer');
        $(_self.$buttonNumber[5]).addClass('is-activated');
      }

      $(_self.$buttonNumberChange[0]).html('...').addClass('no-pointer');
      $(_self.$buttonNumberChange[1]).html(totalPaging - 4).addClass('hidden');
      $(_self.$buttonNumberChange[2]).html(totalPaging - 3).addClass('hidden');
      $(_self.$buttonNumberChange[3]).html(totalPaging - 2).addClass('hidden');
      $(_self.$buttonNumberChange[4]).html(totalPaging - 1).removeClass('no-pointer');
    }
    else {
      _self.$buttonNext.removeClass('no-pointer');
      _self.$buttonPrevious.removeClass('no-pointer');

      $(_self.$buttonNumberChange[0]).html('...').addClass('no-pointer');
      $(_self.$buttonNumberChange[1]).html(pageIndex - 1).addClass('hidden');
      $(_self.$buttonNumberChange[2]).html(pageIndex).addClass('is-activated');
      $(_self.$buttonNumberChange[3]).html(pageIndex + 1).addClass('hidden');
      $(_self.$buttonNumberChange[4]).html('...').addClass('no-pointer');
    }
  }

  function _handleShowPaginationDesktop() {
    _self.$buttonNumber.removeClass('is-activated');
    const state = _self.getState();
    const pageIndex = state.pageIndex;
    const totalPaging = state.totalPaging;

    if (1 <= pageIndex && pageIndex <= 3) {
      _self.$buttonNext.removeClass('no-pointer');
      if (pageIndex === 1) {
        _self.$buttonPrevious.addClass('no-pointer');
      } else {
        _self.$buttonPrevious.removeClass('no-pointer');
      }

      $(_self.$buttonNumber[pageIndex - 1]).addClass('is-activated');
      $(_self.$buttonNumberChange[0]).html(2).removeClass('no-pointer');
      $(_self.$buttonNumberChange[1]).html(3).removeClass('hidden');
      $(_self.$buttonNumberChange[2]).html(4).removeClass('hidden');
      $(_self.$buttonNumberChange[3]).html(5).addClass('hidden');
      $(_self.$buttonNumberChange[4]).html('...').addClass('no-pointer');
    }
    else if (totalPaging - 2 <= pageIndex && pageIndex <= totalPaging) {
      _self.$buttonPrevious.removeClass('no-pointer');
      if (pageIndex === totalPaging) {
        _self.$buttonNext.addClass('no-pointer');
        $(_self.$buttonNumber[6]).addClass('is-activated');
      } else {
        _self.$buttonNext.removeClass('no-pointer');

        if (pageIndex === totalPaging - 1) {
          $(_self.$buttonNumber[5]).addClass('is-activated');
        } else {
          $(_self.$buttonNumber[4]).addClass('is-activated');
        }
      }

      $(_self.$buttonNumberChange[0]).html('...').addClass('no-pointer');
      $(_self.$buttonNumberChange[1]).html(totalPaging - 4).addClass('hidden');
      $(_self.$buttonNumberChange[2]).html(totalPaging - 3).removeClass('hidden');
      $(_self.$buttonNumberChange[3]).html(totalPaging - 2).removeClass('hidden');
      $(_self.$buttonNumberChange[4]).html(totalPaging - 1).removeClass('no-pointer');
    }
    else {
      _self.$buttonNext.removeClass('no-pointer');
      _self.$buttonPrevious.removeClass('no-pointer');

      $(_self.$buttonNumberChange[0]).html('...').addClass('no-pointer');
      $(_self.$buttonNumberChange[1]).html(pageIndex - 1).removeClass('hidden');
      $(_self.$buttonNumberChange[2]).html(pageIndex).addClass('is-activated');
      $(_self.$buttonNumberChange[3]).html(pageIndex + 1).removeClass('hidden');
      $(_self.$buttonNumberChange[4]).html('...').addClass('no-pointer');
    }
  }

}

PaginationConsumer.prototype = Object.create(JpConsumerBase.prototype);

PaginationConsumer.prototype.render = function (state) {
  const _self = this;
  const pageIndex = state.pageIndex;
  const totalPaging = state.totalPaging;
  let pagingNumberLimited;

  if (state.isLoading) {
    _self.$el.hide();
    return;
  }
  else if (state.itemCount == 0) {
    _self.$el.hide();
    return;
  } else {
    _self.$el.show();
  }

  pagingNumberLimited = _self._isMobile ? _self.PAGINATION.numberLimitedMobile : _self.PAGINATION.numberLimitedDesktop;

  if (pageIndex > totalPaging) {
    return;
  }

  if (totalPaging === 1) {
    _self.$jsListingPagination.addClass('hidden');
  } else {
    _self.$jsListingPagination.removeClass('hidden');
  }

  if (totalPaging < pagingNumberLimited) {
    if (totalPaging === 1) {
      _self.$buttonPrevious.addClass('hidden');
      _self.$buttonNext.addClass('hidden');
    } else {
      if (pageIndex === totalPaging) {
        _self.$buttonNext.addClass('no-pointer');
        _self.$buttonPrevious.removeClass('no-pointer hidden');
      } else if (pageIndex === 1) {
        _self.$buttonPrevious.addClass('no-pointer').removeClass('hidden');
        _self.$buttonNext.removeClass('no-pointer hidden');
      } else {
        _self.$buttonPrevious.removeClass('no-pointer hidden');
        _self.$buttonNext.removeClass('no-pointer hidden');
      }
    }

    _self.$buttonNumber.addClass('hidden');
    for (let i = 1; i <= totalPaging; i++) {
      $(_self.$buttonNumber[i - 1]).html(i).removeClass('hidden no-pointer');
    }
    _self.$buttonNumber.removeClass('is-activated');
    $(_self.$buttonNumber[pageIndex - 1]).addClass('is-activated');
    $(_self.$buttonNumber[totalPaging - 1]).html(totalPaging);
  }
  else {
    _self.$buttonNumber.removeClass('hidden');
    _self.$buttonPrevious.removeClass('hidden');
    _self.$buttonNext.removeClass('hidden');

    if (pageIndex === 1) {
      _self.$buttonPrevious.addClass('no-pointer');
      _self.$buttonNext.removeClass('no-pointer hidden');
    }

    _self._handleShowPagination();

    $(_self.$buttonNumber[6]).html(totalPaging);
  }

  let bottomText;

  if (state.itemCount === 1) {
    bottomText = 'Showing 1 Card';
  } else {
    let numberItemShown = null;
    const startNumber = state.pageSize * (pageIndex - 1) + 1;
    let itemDisplayedCount = state.itemCount % state.pageSize;
    if (itemDisplayedCount === 0 || pageIndex < totalPaging) {
      itemDisplayedCount = state.pageSize;
      numberItemShown = `${startNumber} - ${startNumber + itemDisplayedCount - 1}`;
      bottomText = `Showing ${numberItemShown} of ${state.itemCount} Cards`;
    } else {
      if (startNumber === (startNumber + itemDisplayedCount - 1)) {
        numberItemShown = `${startNumber}`;
      } else {
        numberItemShown = `${startNumber} - ${startNumber + itemDisplayedCount - 1}`;
      }
      bottomText = `Showing ${numberItemShown} of ${state.itemCount} Cards`;
    }
  }

  _self.$showBottomText.html(bottomText);

};

export default PaginationConsumer;
