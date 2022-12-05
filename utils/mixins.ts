import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { IColor } from '~/types/interfaces'

/* ----------------------------------- Bad Practice, but Vue-the-mask doesn't export masker function ---------------------------------- */
// @ts-ignore
import masker from 'vue-the-mask/src/masker'
// @ts-ignore
import { tokens } from 'vue-the-mask'

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

@Component({})
export class Masker extends Vue {
  masker(value: string, mask: string[]) {
    return masker(value, mask, true, tokens)
  }
  unmasker(value: string, mask: string[]) {
    return masker(value, mask, false, tokens)
  }
}
