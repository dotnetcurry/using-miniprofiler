ko.bindingHandlers.date = {
    init: function (element, valueAccessor, allBindingsAccessor)
    {
        var dateField = valueAccessor();
        if (dateField() == "")
        {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            $(element).datepicker(options);
            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function ()
            {
                var observable = valueAccessor();
                observable($(element).val());
                if (observable)
                {
                    observable($(element).datepicker("getDate"));
                    $(element).blur();
                }
            });
            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function ()
            {
                $(element).datepicker("destroy");
            });
        }
    },
    update: function (element, valueAccessor)
    {
        var value = ko.utils.unwrapObservable(valueAccessor());
        //handle date data coming via json from Microsoft
        if (String(value).indexOf('/Date(') == 0)
        {
            value = (new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")))).toLocaleString();
        }
        if ($(element).datepicker)
        {
            current = $(element).datepicker("getDate");
            if (value - current !== 0)
            {
                $(element).datepicker("setDate", value);
            }
        }
        else
        {
            $(element)[0].innerHTML = value;
        }
        // Put Data back into the KO View Model
        var vmVal = valueAccessor();
        vmVal(new Date(value));
    }
};