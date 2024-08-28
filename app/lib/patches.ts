import type { Patch, PatchChange } from "~/proto/data";

export interface SerializedPatch {
  id: string;
  major: string;
  minor: string;
  patch: string;
  released: boolean;
  kind: string;
  changes: Array<SerializedPatchChange>;
}

export interface SerializedPatchChange {
  id: string;
  title: string;
  text: string;
}

export function patchVersion(patch: Patch | SerializedPatch): string {
  return `${patch.major}.${patch.minor}.${patch.patch}`;
}

export function serializePatch({
  id,
  major,
  minor,
  patch,
  released,
  kind,
  changes,
}: Patch): SerializedPatch {
  return {
    id: id.toString(),
    major: major.toString(),
    minor: minor.toString(),
    patch: patch.toString(),
    released,
    kind,
    changes: changes.map((change) => serializePatchChange(change)),
  };
}

export function serializePatchChange({
  id,
  title,
  text,
}: PatchChange): SerializedPatchChange {
  return {
    id: id.toString(),
    title,
    text,
  };
}
