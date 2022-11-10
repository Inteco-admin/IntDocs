import { Ref } from "vue"
import { SelectDTO } from "../types/SelectDTo"

/**
 * Return function for filtering select options by value in input,
 * if input is empty set filtered options equal all options 
 * @param filteredOptions options for select after filtration
 * @param allOptions all viable options
 */
export const useSelectFilter = 
  (filteredOptions: Ref<any[]>, allOptions: Ref<SelectDTO[]>) => {

    return (value: string, update) => {

      if (value === '') {
        update(() => filteredOptions.value = allOptions.value)
        return
      }
      
      update(() => {
        const filter = value.toLowerCase()
        filteredOptions.value = allOptions.value.filter(
          (v: any) => v.value.toLowerCase().indexOf(filter) > -1
        );
      })
    }

}