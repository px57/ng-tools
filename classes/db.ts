import { Inject } from "@angular/core";

import { JsonTP } from "../types/basic.types";

/**
 * @description:
 */
export class InjectDBList {
    [key: string]: any;
};


/**
 * @description:
 */
export class DBList {
    /**
     * @description: 
     */
    public dbDict: InjectDBList = {};

    /**
     * @description:
     */
    public reserved_keys: string[] = [
        'refuseKeys', 
        'injectKeys', 
        'dbDict',
        'reserved_keys',
        'json',
    ];

    /**
     * @description:
     * @param dbList 
     */
    constructor(dbList: InjectDBList) {
        this.injectKeys(dbList);
    }

    /**
     * @description:
     */
    private refuseKeys(key: string): boolean {
        return this.reserved_keys.includes(key);
    }

    /**
     * @description:
     */
    private injectKeys(dbList: InjectDBList): void {
        for (const key in dbList) {
            if (this.refuseKeys(key)) {
                throw new Error(`refused key: ${key}`);
            }
            (this as any)[key] = dbList[key];
        }
    }

    /**
     * @description:
     */
    public json(): JsonTP {
        let content: JsonTP = {};
        for (const key in this) {
            if (this.refuseKeys(key)) {
                continue;
            }
            content[key] = (this as any)[key].json();
        }
        return content;
    }

    /**
     * @description:
     */
    public html(): string {
        let content: string = '';
        return content;
    }
}

/**
 * @description: Il s'agit ici d'une table de base de donne.
 */
export class DB  {
    /**
     * @description: 
     */
    public relatedModel: string = '';

    /**
     * @description:
     */
    public reserved_keys: string[] = [
        'relatedModel', 
        'reserved_keys',
        'json',
    ];

    /**
     * @description:
     * @param relatedModel 
     */
    constructor(relatedModel: string) {
        this.relatedModel = relatedModel;
    }

    /**
     * @description:
     */
    public json(): JsonTP {
        let content: JsonTP = {
            relatedModel: this.relatedModel,
        };
        return content;
    }

    /**
     * @description:
     */
    public html(): string {
        let content: string = '';
        return content;
    }
}


const __chatroom_db__: any = new DBList({
    message: new DB('chatroom.Message'),
    chatroom: new DB('chatroom.Chatroom'),
});

