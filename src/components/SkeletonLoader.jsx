import React from 'react';

const SkeletonLoader = ({ type = 'product', count = 1 }) => {
    const ProductSkeleton = () => (
        <div className="card animate-pulse">
            <div className="aspect-square bg-gray-200 skeleton" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded skeleton w-1/3" />
                <div className="h-6 bg-gray-200 rounded skeleton w-3/4" />
                <div className="h-4 bg-gray-200 rounded skeleton w-full" />
                <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded skeleton w-1/4" />
                    <div className="h-4 bg-gray-200 rounded skeleton w-1/4" />
                </div>
            </div>
        </div>
    );

    const TableSkeleton = () => (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4 animate-pulse">
                    <div className="h-12 bg-gray-200 rounded skeleton flex-1" />
                    <div className="h-12 bg-gray-200 rounded skeleton flex-1" />
                    <div className="h-12 bg-gray-200 rounded skeleton flex-1" />
                </div>
            ))}
        </div>
    );

    const CardSkeleton = () => (
        <div className="card animate-pulse p-6">
            <div className="h-8 bg-gray-200 rounded skeleton w-1/3 mb-4" />
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded skeleton w-full" />
                <div className="h-4 bg-gray-200 rounded skeleton w-5/6" />
                <div className="h-4 bg-gray-200 rounded skeleton w-4/6" />
            </div>
        </div>
    );

    const renderSkeleton = () => {
        switch (type) {
            case 'product':
                return <ProductSkeleton />;
            case 'table':
                return <TableSkeleton />;
            case 'card':
                return <CardSkeleton />;
            default:
                return <ProductSkeleton />;
        }
    };

    return (
        <>
            {[...Array(count)].map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
            ))}
        </>
    );
};

export default SkeletonLoader;
