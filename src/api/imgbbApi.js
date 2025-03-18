export async function uploadImageToImgBB(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    const expiration = 15552000  // 180일
    const imagebbApiKey = import.meta.env.IMGBB_API_KEY || process.env.IMGBB_API_KEY;
    const url = `https://api.imgbb.com/1/upload?expiration=${expiration}&key=${IMGBB_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            throw new Error(result.error.message);
        }

        const result = await response.json();
        return result.data.url;

    } catch (error) {
        console.error("이미지 업로드 중 오류: ", error)
    }
}
