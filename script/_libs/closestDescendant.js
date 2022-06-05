(function($) {
  $.fn.closestDescendant = function(selector, findAll) {
    if (!selector || selector === '') {
      return $();
    }

    findAll = findAll ? true : false;

    let resultSet = $();

    this.each(function() {
      const $this = $(this);
      let queue = [];
      queue.push($this);
      while (queue.length > 0) {
        const node = queue.shift();
        const children = node.children();
        for (let i = 0; i < children.length; ++i) {
          let $child = $(children[i]);
          if ($child.is(selector)) {
            resultSet.push($child[0]); //found one
            if (!findAll) {
              return false; //stop processing
            }
          } else {
            queue.push($child); //go deeper
          }
        }
      }
    });

    return resultSet;
  };
})(jQuery);
