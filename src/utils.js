export function addSprite(x, y, key) {
    const sprite = PIXI.Sprite.from(key);
    sprite.position.set(x, y);
    sprite.anchor.set(0.5, 0.5);
    return sprite;
}

export function addText(x, y, key) {
    const style = new PIXI.TextStyle({
        fontFamily: 'Montserrat',
        fontSize: 100,
        fill: 'black',
    });
    let text = new PIXI.Text(key, style);
    text.position.set(x, y);
    text.anchor.set(0.5, 0.5);
    return text;
}
