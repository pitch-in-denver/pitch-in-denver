module.exports = {
  findFromList: function (name, list, field) {
    for (var i = 0; i < list.length; i++) {
      if (name === list[i][field]) {
        return list[i].id
      }
    }
  }
}
