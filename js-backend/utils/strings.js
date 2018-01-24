"use strict";

/**
 * Some string tools
 */
module.exports = {
  /**
   * Make every word's first letter uppercase in the given string
   */
  capitalizeWords: function(str) {
    return str.replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
};
