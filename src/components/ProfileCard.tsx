import { UserProfile } from '@prisma/client';
import { Session } from 'next-auth';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import EditableValue from './EditableValue';
import PrimaryInput from './PrimaryInput';

type Props = {
    session: Session;
};

type Profile = Omit<UserProfile, 'userId' | 'id'>;
const defaultProfile: Profile = { age: null, height: null, weight: null };

const ProfileCard = ({ session }: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [profileInput, setProfileInput] = useState<Profile>(defaultProfile);

    const utils = trpc.useContext();
    const upsertProfileMutation = trpc.useMutation(['user.upsertProfile'], {
        onSuccess() {
            utils.invalidateQueries(['user.getUserProfile']);
            setSaving(false);
        },
        onError() {
            console.error('error updating profile');
            setSaving(false);
        },
    });
    const { data: profileData, isLoading } = trpc.useQuery([
        'user.getUserProfile',
        { userId: session.user.id },
    ]);

    useEffect(() => {
        if (!isLoading && !!profileData)
            setProfileInput(profileData as Profile);
    }, [profileData, isLoading]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        if (profileInput.age && profileInput.height && profileInput.weight) {
            setSaving(true);
            upsertProfileMutation.mutateAsync({
                userId: session.user.id,
                weight: profileInput.weight,
                age: profileInput.age,
                height: profileInput.height,
            });
        }
        setEditMode(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof Profile;
        const value = e.target.value ? Number(e.target.value) : null;
        setProfileInput((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full rounded-lg overflow-hidden">
            <div className="w-full text-slate-400 bg-slate-800">
                <div className="uppercase text-xs font-bold px-8 py-3 flex justify-between items-center">
                    <p className="select-none">profile</p>
                    {editMode ? (
                        <button
                            className="border border-1 border-slate-700 px-3 py-1 rounded text-xs cursor-pointer hover:border-slate-600"
                            onClick={handleSaveClick}
                            disabled={saving}
                        >
                            {saving ? 'saving...' : 'save'}
                        </button>
                    ) : (
                        <button
                            className="border border-1 border-slate-700 px-3 py-1 rounded text-xs cursor-pointer hover:border-slate-600"
                            onClick={handleEditClick}
                        >
                            edit
                        </button>
                    )}
                </div>
            </div>
            <div className="w-full bg-slate-700">
                <div className="px-8 py-3 grid grid-cols-1 gap-2 text-gray-200">
                    {isLoading ? (
                        <div>loading...</div>
                    ) : (
                        <>
                            <EditableValue
                                name="age"
                                label="age"
                                edit={editMode}
                                onChange={handleInputChange}
                                value={profileInput?.age ?? ''}
                                numberInput={true}
                                unit="years"
                            />
                            <EditableValue
                                name="height"
                                label="height"
                                edit={editMode}
                                onChange={handleInputChange}
                                value={profileInput?.height ?? ''}
                                numberInput={true}
                                unit="cm."
                            />
                            <EditableValue
                                name="weight"
                                label="weight"
                                edit={editMode}
                                onChange={handleInputChange}
                                value={profileInput?.weight ?? ''}
                                numberInput={true}
                                unit="kg."
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
