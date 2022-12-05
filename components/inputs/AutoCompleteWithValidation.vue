<script lang="ts">
import { withValidation } from 'vee-validate'
import { VAutocomplete } from 'vuetify/lib'
const AutocompleteFieldWithValidation = withValidation(
  VAutocomplete,
  ({ errors }) => ({
    'error-messages': errors,
  })
)
export default AutocompleteFieldWithValidation
</script>
