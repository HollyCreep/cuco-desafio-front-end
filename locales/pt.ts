const pt = {
  a: {},
  b: { birth_date: 'Data de Nascimento' },
  c: {
    cancel: 'Cancelar',
    caution: 'Atenção',
    customer: 'Cliente | Clientes',
  },
  d: {
    delete: 'Excluir',
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
    new_customer: 'Novo @:c.customer',
    name: 'Nome',
  },
  o: {},
  p: {
    phone: 'Telefone',
  },
  q: {},
  r: {},
  s: {
    save: 'Salvar',
    select_all: 'Selecionar todos',
  },
  t: {},
  u: {},
  v: {},
  w: {},
  x: {},
  y: {},
  z: {},

  errors: {
    delete: 'Não foi possível excluir o {0}',
  },
  messages: {
    no_data: 'Não foram encontrados nenhum registro para a busca atual.',
    edit: '@:c.customer editado com sucesso!',
    delete: '{0} excluído com sucesso!',
    delete_confirm:
      'Você tem certeza que quer excluir os cliente(s) selecionado(s)?',
  },
}
export default pt

export type Translator = typeof pt
