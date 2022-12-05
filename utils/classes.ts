import { Component, Vue } from 'vue-property-decorator'
import { MetaInfo } from 'vue-meta'
import { ValidationObserver } from 'vee-validate'
import { Locale } from '~/types'
import ROUTES from '~/types/constants/routes'
@Component({})
export class BaseComponent extends Vue {
  get routes() {
    return {...ROUTES}
  }
}

@Component({})
export class ResponsiveComponent extends Vue {
  get isMobile() {
    return this.$vuetify.breakpoint.smAndDown
  }
}

/* Abstract class throw erros at current vue-class-component version */
// @ts-ignore
@Component<AbstractPage>({
  head(): MetaInfo {
    return {
      ...this.head,
    }
  },
})
abstract class AbstractPage extends ResponsiveComponent {
  abstract head: MetaInfo

  // Unfortunately each page needs to implement its routes with duplicity, because nuxti18n does not accept variables
  abstract customRoutePath: Record<Locale, string>

  created(): void {
    const { locale } = this.$i18n
    const route = this.customRoutePath[locale as Locale].replace('/', '')

    this.head = {
      ...this.head,
      ...{
        title: route
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        titleTemplate: (title) => 'CUCOHealth' + (title && ' - ') + `${title}`,
      },
    }
  }
}

// @ts-ignore
@Component({})
abstract class abstractForm extends ResponsiveComponent {
  valid: boolean = false
  loading: boolean = false

  $refs!: {
    obs: InstanceType<typeof ValidationObserver>
  }

  async handleSubmit() {
    if (await this.validate()) {
      this.submit()
    }
  }

  async validate(): Promise<boolean> {
    return await this.$refs.obs.validate().then((value: boolean) => {
      return value
    })
  }

  resetValidation(): void {
    this.$refs.obs && this.$refs.obs.reset()
  }

  abstract submit(): void
  abstract clear(): void
}

// We export this way, so components can extend directly or with mixin()
// @ts-ignore
export class Page extends AbstractPage {}
// @ts-ignore
export class BaseForm extends abstractForm {}
