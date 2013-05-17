var viewModel = function (data)
{
    this.pageSize = ko.observable(data.PageSize);
    this.currentPage = ko.observable(data.PageNumber);
    this.pageData = ko.observableArray(ko.mapping.fromJS(data.Data));
    this.recordCount = ko.observable(data.RecordCount);

    this.isLastPage = function ()
    {
        var recordsLeft = (this.recordCount() - (this.pageSize() * this.currentPage()))
        return recordsLeft <= 0;
    }

    this.isFirstPage = function ()
    {
        return this.currentPage() == 1;
    }
}
