export function getAvatarImage(img = null, folderName, name = 'Mehedi Hasan') {
    // genarate random color code
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (img) {
        return `/uploads/${folderName}/${img}`;
    } else if (img === null && name) {
        return `https://ui-avatars.com/api/?background=${randomColor}&color=fff&name=${name}`;
    }
    return null;
}
