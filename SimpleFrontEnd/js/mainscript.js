﻿AZ.Documents = (function (ko) {
	"use strict";

	var docViewModel = {
		documents: ko.observableArray(),
		currentUser: ko.observable('Local User') // Use this to show the current user if using authentication
	};

	var apiUrl = "";

	function getApiData() {

		// Get list of Documents for the current user (as determined by the API)
		AZ.Ajax.MakeAjaxCall("GET",
			apiUrl,
			null,
			function (data) {
				initList(data);
			});
	}

	function initList(items, username) {
		docViewModel.documents = ko.observableArray(items);
		ko.applyBindings(docViewModel);
	}

	// Do this on start
	$(document).ready(function () {

		// Set the URL based in whether we are running locally or not
		// The URL locations are set in vars.js
		// This is a hack and is better solved via a build process
		if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
			apiUrl = localUrl;
		} else {
			apiUrl = remoteUrl;
		}

		// Now get the data
		if (noApi) {
			initList(null);
		} else {
			getApiData();
		}
	});

	return {
		model: docViewModel,

		AddEdit: function() {
			var newTodo = prompt("Enter new todo item:");
			if (newTodo) {
				var newTodoItem = { ItemName: newTodo }
				if (noApi) {
					newTodoItem.ItemCreateDate = new Date();
					docViewModel.documents.push(newTodoItem);
				} else {
					AZ.Ajax.MakeAjaxCall("POST",
						apiUrl,
						JSON.stringify(newTodoItem),
						function (data) {
							docViewModel.documents.push(data);
						});
				}
			}
		},

		Remove: function(item) {
			if (confirm("Mark item '" + item.ItemName + "' as completed?")) {
				if (noApi) {
					docViewModel.documents.remove(item);
				} else {
					AZ.Ajax.MakeAjaxCall("DELETE",
						apiUrl + "/" + item.id,
						null,
						function (data) {
							docViewModel.documents.remove(item);
						});
				}
			}
		}
	}
}(ko));