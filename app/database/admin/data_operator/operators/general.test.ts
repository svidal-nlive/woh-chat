// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {
    operateAppRecord, operateCustomEmojiRecord,
    operateGlobalRecord, operateRoleRecord,
    operateServersRecord, operateSystemRecord, operateTermsOfServiceRecord,
} from '@database/admin/data_operator/operators/general';
import {createConnection} from '@database/admin/data_operator/operators/utils';
import DatabaseManager from '@database/admin/database_manager';
import {OperationType} from '@typings/database/enums';

describe('*** Isolated Prepare Records Test ***', () => {
    it('=> operateAppRecord: should return an array of type App', async () => {
        expect.assertions(3);

        const database = await DatabaseManager.getDefaultDatabase();
        expect(database).toBeTruthy();

        const preparedRecords = await operateAppRecord({
            action: OperationType.CREATE,
            database: database!,
            value: {
                record: undefined,
                raw: {
                    build_number: 'build-7',
                    created_at: 1,
                    version_number: 'v-1',
                },
            },
        });

        expect(preparedRecords).toBeTruthy();
        expect(preparedRecords!.collection.modelClass.name).toBe('App');
    });

    it('=> operateGlobalRecord: should return an array of type Global', async () => {
        expect.assertions(3);

        const database = await DatabaseManager.getDefaultDatabase();
        expect(database).toBeTruthy();

        const preparedRecords = await operateGlobalRecord({
            action: OperationType.CREATE,
            database: database!,
            value: {
                record: undefined,
                raw: {name: 'g-n1', value: 'g-v1'},
            },
        });

        expect(preparedRecords).toBeTruthy();
        expect(preparedRecords!.collection.modelClass.name).toBe('Global');
    });

    it('=> operateServersRecord: should return an array of type Servers', async () => {
        expect.assertions(3);

        const database = await DatabaseManager.getDefaultDatabase();
        expect(database).toBeTruthy();

        const preparedRecords = await operateServersRecord({
            action: OperationType.CREATE,
            database: database!,
            value: {
                record: undefined,
                raw: {
                    db_path: 'mm-server',
                    display_name: 's-displayName',
                    mention_count: 1,
                    unread_count: 0,
                    url: 'https://community.mattermost.com',
                },
            },
        });

        expect(preparedRecords).toBeTruthy();
        expect(preparedRecords!.collection.modelClass.name).toBe('Servers');
    });

    it('=> operateRoleRecord: should return an array of type Role', async () => {
        expect.assertions(3);

        const database = await createConnection('isolated_prepare_records');
        expect(database).toBeTruthy();

        const preparedRecords = await operateRoleRecord({
            action: OperationType.CREATE,
            database: database!,
            value: {
                record: undefined,
                raw: {
                    id: 'role-1',
                    name: 'role-name-1',
                    permissions: [],
                },
            },
        });

        expect(preparedRecords).toBeTruthy();
        expect(preparedRecords!.collection.modelClass.name).toBe('Role');
    });

    it('=> operateSystemRecord: should return an array of type System', async () => {
        expect.assertions(3);

        const database = await createConnection('isolated_prepare_records');
        expect(database).toBeTruthy();

        const preparedRecords = await operateSystemRecord({
            action: OperationType.CREATE,
            database: database!,
            value: {
                record: undefined,
                raw: {id: 'system-1', name: 'system-name-1', value: 'system'},
            },
        });

        expect(preparedRecords).toBeTruthy();
        expect(preparedRecords!.collection.modelClass.name).toBe('System');
    });

    it('=> operateTermsOfServiceRecord: should return an array of type TermsOfService', async () => {
        expect.assertions(3);

        const database = await createConnection('isolated_prepare_records');
        expect(database).toBeTruthy();

        const preparedRecords = await operateTermsOfServiceRecord({
            action: OperationType.CREATE,
            database: database!,
            value: {
                record: undefined,
                raw: {
                    id: 'tos-1',
                    accepted_at: 1,
                    create_at: 1613667352029,
                    user_id: 'user1613667352029',
                    text: '',
                },
            },
        });

        expect(preparedRecords).toBeTruthy();
        expect(preparedRecords!.collection.modelClass.name).toBe(
            'TermsOfService',
        );
    });

    it('=> operateCustomEmojiRecord: should return an array of type CustomEmoji', async () => {
        expect.assertions(3);

        const database = await createConnection('isolated_prepare_records');
        expect(database).toBeTruthy();

        const preparedRecords = await operateCustomEmojiRecord({
            action: OperationType.CREATE,
            database: database!,
            value: {
                record: undefined,
                raw: {
                    id: 'i',
                    create_at: 1580913641769,
                    update_at: 1580913641769,
                    delete_at: 0,
                    creator_id: '4cprpki7ri81mbx8efixcsb8jo',
                    name: 'boomI',
                },
            },
        });

        expect(preparedRecords).toBeTruthy();
        expect(preparedRecords!.collection.modelClass.name).toBe('CustomEmoji');
    });
});
