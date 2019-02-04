import moment from 'moment'
import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'
const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function dataHandler(query,origin_data,columns) {
  query = purify(query)
  const { limit = 10, offset = 0, sort = '', order = '' } = query

  let rows = origin_data;

  //console.log(origin_data)

  // custom query conditions
  columns.forEach(field => {
    switch (typeOf(query[field])) {
      case 'array':
        rows = rows.filter(row => query[field].includes(row[field]))
        break
      case 'string':
        rows = rows.filter(row => row[field].toLowerCase().includes(query[field].toLowerCase()))
        break
      default:
        // nothing to do
        break
    }
  })





  if (sort) {
    //숫자 자료형 필드도 String 처리 되어있음으로 Number 변환후 숫자형 자료이면 ,제거
    if(rows[0][sort].toString().substring(0,2) !="0x" && (Number(rows[0][sort]) || Number(rows[0][sort].replace(/,/gi,"")))){
      rows.filter(row => {
        row[sort]=Number(row[sort].toString().replace(/,/gi,""))
      })
    }

    rows = orderBy(rows, sort, order)

    //소팅후 number 에, 추가
     if(typeof(rows[0][sort])=='number'){
      rows.filter(row => {
        //row[sort]=row[sort].toString().replace(/^[+-]?[\d,]*(\.?\d*)$/);
        let parts =row[sort].toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        row[sort] = parts.join(".")
      })
    }
  }



  const res = {
    rows: rows.slice(offset, offset + limit),
    total: rows.length
    // ,
    // summary: {
    //   uid: rows.length,
    //   age: rows.length && ~~(rows.map(({ age }) => age).reduce((sum, cur) => sum + cur) / rows.length), // average age
    //   country: uniq(rows.map(({ country }) => country)).length
    // }
  }

  return Promise.resolve(purify(res))
}
