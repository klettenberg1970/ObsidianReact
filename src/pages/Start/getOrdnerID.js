
import { Obsidian } from '../../utils/googleDriveClass.js'

export const ordnerId = async(name) =>{
    const obsidianObjekt = new Obsidian();
    const daten = await obsidianObjekt.getOrdnerIdByName(name)
    return daten.ordner.id

}
