import React from 'react'
import styles from '../page/page.module.css'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui-core'

const SelectField = ({ change, options, selected, label, ...otherProps }) => {
    const optionElements = options.map(o => (
        <SingleSelectOption key={o.value} value={o.value} label={o.label}/>
    ))
    return (

        <div className={styles.container}>
            <span className={styles.label}>
                {label}
                {otherProps.required && <span> *</span>
                }
            </span>
            <SingleSelectField onChange={change} selected={selected}>{optionElements}</SingleSelectField>
        </div>
    )
}

export { SelectField }