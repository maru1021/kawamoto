export function searchAddress(){
    searchAddressBtn.disabled = true;
    let postCode = document.getElementById('supporterPost').value.trim();
    postCode = postCode.replace('-', '');

    if (!(postCode.length === 7 && /^\d+$/.test(postCode))) {
        alert('半角で正しい郵便番号を入力してください。');
        searchAddressBtn.disabled = false;
        return
    }
    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postCode}`)
    .then(response => response.json())
    .then(data => {
    if (data.status === 200 && data.results) {
        const address = `${data.results[0].address1}${data.results[0].address2}${data.results[0].address3}`;
        document.getElementById('supporterAddress').value = address;
    } else {
        alert('該当する住所が見つかりませんでした。');
    }
    })
    .catch(error => {
        console.error('エラー:', error);
        alert('住所の検索中にエラーが発生しました。');
    })
    .finally(() => {
        searchAddressBtn.disabled = false;
    });
}