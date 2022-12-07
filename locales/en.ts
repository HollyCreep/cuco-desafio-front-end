import { Translator } from './pt'

const en: Translator = {
  a: {},
  b: { birth_date: 'Birth date' },
  c: {
    cancel: 'Cancel',
    caution: 'Caution',
    customer: 'Customer | Customer',
  },
  d: { delete: 'Delete' },
  e: {
    edit: 'Edit',
    edit_customer: '@:e.edit @:c.customer',
  },
  f: {},
  g: {},
  h: {},
  i: {},
  j: {},
  k: {},
  l: {},
  m: {},
  n: {
    new_customer: 'New @:c.customer',
    name: 'Name',
  },
  o: {},
  p: {
    phone: 'Phone',
  },
  q: {},
  r: {},
  s: {
    save: 'Save',
    search: 'Enter a name or CPF here',
    select_all: 'Select all',
  },
  t: {},
  u: {},
  v: {},
  w: {},
  x: {},
  y: {},
  z: {},

  errors: {
    delete: 'It was not possible to exclude {0}',
  },

  messages: {
    no_data: 'No data found.',
    edit: '@:c.customer successfully edited!',
    delete: '{0} successfully deleted!',
    delete_confirm: 'Are you sure you want to delete the selected customer?',
  },
}
export default en
