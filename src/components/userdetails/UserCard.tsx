import React from 'react';
import { CheckCircle, XCircle, Mail, User } from 'lucide-react';
import { UserProp } from '@/types/user.prop';


interface UserCardProps {
    user: UserProp;
}

const UserCard = ({ user } : UserCardProps) => {
    return (
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
            <div className="p-5">
                {/* Header with status */}
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900">
                        {user.name}
                    </h5>
                    <div className="flex items-center">
                        {user.status == "active" ? (
                            <>
                                <CheckCircle className="w-5 h-5 text-green-500 mr-1" />
                                <span className="text-sm text-green-500">Active</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-5 h-5 text-red-500 mr-1" />
                                <span className="text-sm text-red-500">Inactive</span>
                            </>
                        )}
                    </div>
                </div>
                
                {/* User info */}
                <div className="space-y-3">
                    <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">{user.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">
                            {user.gender === 'male' ? 'Masculino' : 
                             user.gender === 'female' ? 'Femenino' : user.gender}
                        </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                        ID: {user.id}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;