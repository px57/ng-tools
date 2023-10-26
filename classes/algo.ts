

/**
 * @description: Manage the duplicate in a list. 
 */
export class DeleteDuplicate {
    /**
     * @description: The list of object to verify if there is duplicate.
     */
    private list_element: Array<any> = [];

    constructor() { }

    /**
     * @description: Add an element to the list of element to verify.
     */
    private has_duplicated_value(value: any): boolean {
        if (this.list_element.includes(value)) {
            return true;
        }
        this.list_element.push(value);
        return false;
    }

    /**
     * @description: Row by row, verify if the value of the key is duplicated. 
     */
    public foreach(array: Array<any>, key: any): Array<any> {
        let new_array: Array<any> = [];
        for (let element of array) {
            if (this.has_duplicated_value(element[key])) {
                continue;
            }
            new_array.push(element);
        }
        return new_array;
    }
}

