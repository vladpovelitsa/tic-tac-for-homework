export default class Game {
  static isXTurn = true
  static isFieldFull = false;

  constructor(fieldSize) {
    this.fieldSize = fieldSize
    this.field = this.addField()
  }

  addField() {
    let field = document.createElement('div')
    field.classList.add('field')
    for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
      field.appendChild(this.addCells(i + 1))
    }
    // document.querySelector('.game').appendChild(field)
    return field
  }

  renderField() {
    document.querySelector('.game').appendChild(this.field)
    let cellSize = Math.min(this.field.offsetHeight, this.field.offsetWidth) / this.fieldSize
    this.field.style.gridTemplateColumns = `repeat(${+this.fieldSize}, ${cellSize}px)`
    this.field.style.gridTemplateRows = `repeat(${+this.fieldSize}, ${cellSize}px)`
    this.toggleHint()
  }

  addCells(id) {
    let btn = document.createElement('button')
    btn.classList.add('cell')
    btn.innerText = '-'
    btn.setAttribute('data-id', id)

    btn.addEventListener('click', () => {
      event.preventDefault()
      btn.classList.add('material-symbols-outlined')
      btn.innerText = Game.isXTurn ? 'x' : 'o'
      btn.classList.add(Game.isXTurn ? 'cell_with-x' : 'cell_with-o')
      Game.isFieldFull = Array.from(this.field.children).every(item => item.className.split(' ').length > 1)
      document.querySelector('.hint').innerText = `Now ${!Game.isXTurn ? "X" : "O"} turn`
      this.toggleHint()
      this.checkRows(this.mapField(btn))


      Game.isXTurn = !Game.isXTurn
    })
    return btn
  }

  restartGame() {
    document.querySelector('.game').querySelector('.field').remove()
    this.addField()
    this.renderField()
  }

  toggleHint() {
    let hint = document.querySelector('.hint')
    let fieldSizeSelector = document.querySelector('.field-size-selector')
    if (!Game.isFieldFull) {
      fieldSizeSelector.style.display = 'none'
      hint.style.display = 'block'
    }
    else {
      fieldSizeSelector.style.display = 'block'
      hint.style.display = 'none'
      alert('Field is full, start again')
    }
  }

  mapField() {
    let fieldMap = {rows: [], cols: []};
    for (let i = 0, j = 1, k = 0, l = 0;
         j <= (this.fieldSize * this.fieldSize);
         j++, k += +this.fieldSize) {
      if (fieldMap.rows[i] === undefined) {
        fieldMap.rows.push('')
      }
      if (fieldMap.cols[i] === undefined) {
        fieldMap.cols.push('')
      }
      fieldMap.rows[i] += this.field.children[j - 1].innerText

      if (k >= this.fieldSize * this.fieldSize) {
        l++
        k = l
      }
      if (l < this.fieldSize * this.fieldSize) {
        fieldMap.cols[i] += this.field.children[k].innerText
      }
      if (j % +this.fieldSize === 0 && j > 0) {
        i++
      }
    }
    console.log(fieldMap)
    return fieldMap
  }

  checkRows(map) {
    map.rows.forEach(row => {
      if (row.includes('xxx') || row.includes('ooo')) {
        alert('winner is: ' + (Game.isXTurn ? 'X' : 'O') + ' (by line)')
        // stop game
      }
    })
    map.cols.forEach(row => {
      if (row.includes('xxx') || row.includes('ooo')) {
        alert('winner is: ' + (Game.isXTurn ? 'X' : 'O') + ' (by line)')
        // stop game
      }
    })
  }

}














