export default class Model {
    id
    #errors = {}

    get id() {
        return this.id
    }

    getRules() {
        return {}
    }

    getFields() {
        return {}
    }

    setFields(fields) {

    }

    addError(attr, error) {
        if (!this.#errors[attr]) {
            this.#errors[attr] = []
        }

        this.#errors[attr].push(error)
    }

    validate(models) {
        this.#errors = {}
        const rules = this.getRules()

        for (let attr in rules) {
            const attrRules = rules[attr]
            const attrValue = this[attr]

            for (let i of attrRules) {
                if (i.rule instanceof RegExp) {
                    if (!i.rule.test(attrValue)) {
                        this.addError(attr, i.message)
                    }
                } else {
                    if (!i.rule(attrValue, models)) {
                        this.addError(attr, i.message)
                    }
                }
            }
        }

        return this.hasErrors()
    }

    hasErrors() {
        return Object.keys(this.#errors).length === 0;
    }

    getErrors(attr) {
        if (attr && this.#errors[attr]) {
            return this.#errors[attr]
        }

        return this.#errors
    }

    getLabels() {
        return {}
    }

    getLabel(field) {
        const labels = this.getLabels()

        return labels[field]
            ? labels[field]
            : (() => {
                let l = field.replace('_', ' ').replace('_id', '')

                return l.charAt(0).toUpperCase() + l.slice(1)
            })()
    }
}
