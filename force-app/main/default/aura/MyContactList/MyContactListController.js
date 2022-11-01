({
    myAction: function(component, event, helper) {
        var action = component.get("c.getContacts");
        component.set("v.Columns", [
            { label: "First Name", fieldName: "FirstName", type: "text" },
            { label: "Last Name", fieldName: "LastName", type: "text" },
            { label: "Email", fieldName: "Email", type: "email" }
        ]);


        action.setCallback(this, function(data) {
            component.set("v.Contacts", data.getReturnValue());
        });
        $A.enqueueAction(action);


    }
})