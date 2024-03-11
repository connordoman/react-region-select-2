/**
 * Determines if an element is a subelement of another element
 * @param el the element to check
 * @param check a function that returns true if the element is the one we are looking for
 * @returns true if the element is a subelement of the element we are looking for
 */
export function isSubElement(el: HTMLElement | null, check: (el: HTMLElement) => boolean): boolean {
    if (el === null) {
        return false;
    } else if (check(el)) {
        return true;
    } else {
        return el.parentNode instanceof HTMLElement ? isSubElement(el.parentNode, check) : false;
    }
}
