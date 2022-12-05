<script lang="ts">
import { withValidation } from 'vee-validate'
import { VTextField } from 'vuetify/lib'
const TextFieldWithValidation = withValidation(VTextField, ({ errors }) => ({
  'error-messages': errors,
}))
export default TextFieldWithValidation
</script>
