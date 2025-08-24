export function randHash(number:number):string{
    const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let randHash :string = "";
    for(let i = 0;i<number;i++){
        let randIdx = Math.floor(Math.random() * 61);
        randHash += chars[randIdx];
    }
    console.log(randHash);
    return randHash;
}
