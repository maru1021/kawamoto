export function searchAddress() {
    const btn = document.getElementById('searchAddressBtn');
    btn.disabled = true;

    const postCode = document.getElementById('supporterPost').value.trim().replace('-', '');

    if (postCode.length !== 7 || !/^\d+$/.test(postCode)) {
        alert('半角で正しい郵便番号を入力してください。');
        btn.disabled = false;
        return;
    }

    fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.results) {
                const r = data.results[0];
                document.getElementById('supporterAddress').value = r.address1 + r.address2 + r.address3;
            } else {
                alert('該当する住所が見つかりませんでした。');
            }
        })
        .catch(error => {
            console.error('エラー:', error);
            alert('住所の検索中にエラーが発生しました。');
        })
        .finally(() => {
            btn.disabled = false;
        });
}
