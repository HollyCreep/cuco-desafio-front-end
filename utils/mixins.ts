import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { IColor } from '~/types/interfaces'

@Component({})
export class ColorsMixin extends Vue {
  @Prop({ type: String, default: 'primary' })
  readonly color!: string

  get computedColor() {
    return this.getColor(this.color)
  }

  get cssVars() {
    return {
      '--color': this.computedColor,
    }
  }

  getColor(cor: string) {
    try {
      const [color, variant] = cor.replace('-', '').split(' ')
      return (
        (this.$vuetify.theme.themes.light?.[color] as IColor)?.[
          (variant as keyof IColor) || 'base'
        ] ||
        this.$vuetify.theme.themes.light[color] ||
        this.$vuetify.theme.themes.light[cor] ||
        color
      )
    } catch (error) {
      return cor
    }
  }
}
