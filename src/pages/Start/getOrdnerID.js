
import {Obsidian} from '../../utils/obsidianClass.js'

export const ordnerId = async(name) =>{
    const obsidianObjekt = new Obsidian();
    const daten = await obsidianObjekt.getOrdnerIdByName(name)
    return daten.ordner.id

}