import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'
import { migrateRelationshipsV2_V3 } from '@payloadcms/db-mongodb/migration-utils'

/**
 * Payload 1 and 2 stored relationship and upload values as strings
 * (artworks.image, artworks.category). Payload 3 stores them as ObjectIDs
 * and cannot populate or query the string form. This rewrites them in place.
 * It is idempotent: values that are already ObjectIDs are left as they are.
 */
export async function up({ req }: MigrateUpArgs): Promise<void> {
  await migrateRelationshipsV2_V3({
    batchSize: 100,
    req,
  })
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Not reversible in place: going back to Payload 1 means restoring the
  // pre-migration dump (see README, "Rolling back to Payload 1").
}
