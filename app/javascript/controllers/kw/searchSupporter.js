export function searchSupporter(col){
    const tbody = supporterTable.querySelector('tbody');
    const filter = search.value.toLowerCase();
    const filteredData = tableData.filter(supporter => {
        return col.some(key => supporter[key].toLowerCase().includes(filter));
    });
    tbody.innerHTML = '';

    filteredData.forEach(data => {
        const rowContent = col
            .map(key => `<td>${data[key]}</td>`)
            .join('');

        const tr = document.createElement('tr');
        tr.id = data.id;
        tr.innerHTML = rowContent;

        tbody.appendChild(tr);
    });
}