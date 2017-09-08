$(document).ready(function (){
	

	
});

function searchRepositories() {
	let searchTerms = document.getElementById("searchTerms").value
	searchTerms = searchTerms.split(' ').join('+')
	$.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) { executeRepos(data)}).fail(function(error){
		displayError()
	})
}	

function showCommits() {
	let url = event.target.parentElement.getElementsByTagName("a")[0].innerHTML.split('/')
	let user = url[3]
	let repo = url[4].split(' ').join('+')
	$.get(`https://api.github.com/repos/${user}/${repo}/commits?access_token=dc4a4e524037cb8035b964132abdb5cbf0bf914d`, function(data){executeCommits(data)}).fail(function(error){
		displayError()
	})
}

function renderCommits(commits) {
	return commits.map(function(commit){
		return `
		<div>
			<p>${commit.sha}</p>
			<p>${commit.author.login}</p>
			<img src="${commit.author.avatar_url}"">
		</div>
		`
	})
}

function appendCommits(renderedCommits) {
	let commits = renderedCommits.join('')
	document.getElementById("details").innerHTML = commits
}

function executeCommits(data) {
	let renderedCommits = renderCommits(data)
	appendCommits(renderedCommits)
}

function displayError() {
	document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again."
}

function renderRepos(data) {
	return data.items.map(function(item) {
		return `
		<div>
			<p>${item.name}</p>
			<p>${item.description}</p>
			<a href="${item.html_url}">${item.html_url}</a>
			<a href="#" onclick="showCommits()">Show Commits</a>
		</div>
		`
	})
}

function appendRenderedRepos(renderedRepos) {
	let repos = renderedRepos.join('')
	document.getElementById('results').innerHTML = repos
}

function executeRepos(data) {
	let renderedRepos = renderRepos(data)
	appendRenderedRepos(renderedRepos)
}