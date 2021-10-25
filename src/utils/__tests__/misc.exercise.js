import {formatDate} from 'utils/misc'

test('formatDate formats the date to look nice', () => {
  expect(formatDate(new Date(2077, 10, 23))).toMatchInlineSnapshot(`"Nov 77"`)
})
