<script lang="ts">
import { withValidation } from 'vee-validate'
import { VSelect } from 'vuetify/lib'
const SelectFieldWithValidation = withValidation(VSelect, ({ errors }) => ({
  'error-messages': errors,
}))
export default SelectFieldWithValidation
</script>
