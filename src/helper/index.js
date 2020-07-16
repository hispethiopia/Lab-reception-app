const validate = (instance, program, stage) => {
    var errors = []
    /**
     * Check mandatory fields in attributes
     */
    program.programTrackedEntityAttributes.forEach(attribute => {
        if (attribute.mandatory && !instance.trackedEntityInstance.attributes[attribute.trackedEntityAttribute.id]) {
            errors.push(`Mandatory attribute ${attribute.trackedEntityAttribute.displayName} missing.`)
        }
    });


    /**
     * Check if there is an event for that instance.
     */
    if (!instance.event) {
        errors.push(`No event created with in the provided selection.`)
    }
    /**
     * Check compulsory data elements in stage.
     */
    else {
        if (instance.event && instance.event.status!== "COMPLETED") {
            errors.push("Event not completed")
        }
        stage.programStageDataElements.forEach(dataElement => {
            if (dataElement.compulsory && !instance.event.dataValues[dataElement.dataElement.id]) {
                errors.push(`Mandatory value ${dataElement.dataElement.displayName} missing`)
            }
        });
    }

    return errors

}

const checkSpecimenId = (specimenIdToCheck) => {

}


export {
    validate
}