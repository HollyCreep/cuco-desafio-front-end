<script lang="ts">
import { withValidation } from 'vee-validate'
import { VTextarea } from 'vuetify/lib'
const TextAreaWithValidation = withValidation(VTextarea, ({ errors }) => ({
  'error-messages': errors,
}))
export default TextAreaWithValidation
</script>
