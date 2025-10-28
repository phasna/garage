<?php

namespace App\Repository;

use App\Entity\Rental;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Rental>
 */
class RentalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Rental::class);
    }

    /**
     * Find rentals by status
     */
    public function findByStatus(string $status): array
    {
        return $this->createQueryBuilder('r')
            ->where('r.status = :status')
            ->setParameter('status', $status)
            ->orderBy('r.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Find active rentals for a vehicle
     */
    public function findActiveByVehicle(int $vehicleId): array
    {
        return $this->createQueryBuilder('r')
            ->where('r.vehicle = :vehicleId')
            ->andWhere('r.status IN (:statuses)')
            ->setParameter('vehicleId', $vehicleId)
            ->setParameter('statuses', ['confirmed', 'active'])
            ->getQuery()
            ->getResult();
    }

    /**
     * Find rentals by customer
     */
    public function findByCustomer(int $customerId): array
    {
        return $this->createQueryBuilder('r')
            ->where('r.customer = :customerId')
            ->setParameter('customerId', $customerId)
            ->orderBy('r.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Find rentals ending soon (within X days)
     */
    public function findEndingSoon(int $days = 3): array
    {
        $endDate = new \DateTime();
        $endDate->add(new \DateInterval('P' . $days . 'D'));

        return $this->createQueryBuilder('r')
            ->where('r.endDate <= :endDate')
            ->andWhere('r.status = :status')
            ->setParameter('endDate', $endDate)
            ->setParameter('status', 'active')
            ->orderBy('r.endDate', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Get rental statistics for a period
     */
    public function getStatistics(\DateTimeInterface $startDate, \DateTimeInterface $endDate): array
    {
        $qb = $this->createQueryBuilder('r');

        return $qb
            ->select([
                'COUNT(r.id) as totalRentals',
                'SUM(r.totalPrice) as totalRevenue',
                'AVG(r.totalPrice) as averagePrice',
                'COUNT(DISTINCT r.customer) as uniqueCustomers'
            ])
            ->where('r.createdAt >= :startDate')
            ->andWhere('r.createdAt <= :endDate')
            ->andWhere('r.status != :cancelledStatus')
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate)
            ->setParameter('cancelledStatus', 'cancelled')
            ->getQuery()
            ->getSingleResult();
    }
}
