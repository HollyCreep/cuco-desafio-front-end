import { Translator } from './pt'

const es: Translator = {
  a: {},
  b: { birth_date: 'Fecha de nacimiento' },
  c: {
    cancel: 'cancelar',
    caution: 'Atenção',
    customer: 'Cliente | Clientes',
  },
  d: {
    delete: 'Eliminar',
  },
  e: {
    edit: 'Editar',
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
    new_customer: 'Nuevo @:c.customer',
    name: 'Nombre',
  },
  o: {},
  p: {
    phone: 'Teléfono',
  },
  q: {},
  r: {},
  s: {
    save: 'Ahorrar',
    select_all: 'Seleccionar todo',
  },
  t: {},
  u: {},
  v: {},
  w: {},
  x: {},
  y: {},
  z: {},

  errors: {
    delete: 'No se pudo eliminar el{0}',
  },
  messages: {
    no_data: 'No se encontraron registros para la búsqueda actual.',
    edit: '@:c.customer editado con éxito!',
    delete: '{0} excluído con éxito!',
    delete_confirm:
      '¿Está seguro de que desea eliminar los clientes seleccionados??',
  },
}
export default es
