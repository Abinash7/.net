/// <reference path="jquery-1.8.0.intellisense.js" />

$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "json",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ID + '</td>';
                html += '<td>' + item.Fullname + '</td>';
                html += '<td>' + item.Username + '</td>';
                html += '<td>' + item.Password + '</td>';
                html += '<td>' + item.CountryID + '</td>';
                html += '<td>' + item.Gender + '</td>';
                html += '<td>' + item.Interests + '</td>';
                html += '<td><a href="#" onclick="return FindByID(' + item.ID + ')">Edit</a> | <a href="#" onclick="Delete(' + item.ID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });

}

function Add() {
    var pr = {
        ID: $("#ID").val(),
        Fullname: $("#Fullname").val(),
        Username: $("#Username").val(),
        Password: $("#Password").val(),
        CountryID: $("#CountryID").val(),
        Gender: $("#Gender").val(),
        Interests: $("#Interests").val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(pr),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $("#myModal").modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function FindByID(id) {
    $.ajax({
        url: "/Home/FindByID/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            $("#ID").val(result.ID);
            $("#Fullname").val(result.Fullname);
            $("#Username").val(result.Username);
            $("#Password").val(result.Password);
            $("#CountryID").val(result.CountryID);
            $("#Gender").val(result.Gender);
            $("#Interests").val(result.Interests);

            $("#myModal").modal('show');
            $('#btnAdd').hide();
            $("#btnUpdate").show();
        },

        error: function (errormessage) {
            alert(errormessage.responseText);
        }

    });
}

function Update() {
    var pr = {
        ID: $("#ID").val(),
        Fullname: $("#Fullname").val(),
        Username: $("#Username").val(),
        Password: $("#Password").val(),
        CountryID: $("#CountryID").val(),
        Gender: $("#Gender").val(),
        Interests: $("#Interests").val()
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(pr),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (ready) {
            loadData();
            $('#myModal').modal('hide');
            ID: $("#ID").val("");
            Fullname: $("#Fullname").val("");
            Username: $("#Username").val("");
            Password: $("#Password").val("");
            CountryID: $("#CountryID").val("");
            Gender: $("#Gender").val("");
            Interests: $("#Interests").val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function Delete(id) {
    var msg = confirm("Are you sure to delete?");
    if (msg) {
        $.ajax({
            url: "/Home/Delete/" + id,
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (ready) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        });
    }
}

function clearText() {
    $("#ID").val("");
    $("#Fullname").val("");
    $("#Username").val("");
    $("#Password").val("");
    $("#CountryID").val("");
    $("#Gender").val("");
    $("#Interests").val("");
    $("#btnAdd").show();
    $("#btnUpdate").hide();
}
