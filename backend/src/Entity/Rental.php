<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\RentalRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RentalRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/rentals',
            normalizationContext: ['groups' => ['rental:read']]
        ),
        new Post(
            uriTemplate: '/rentals',
            denormalizationContext: ['groups' => ['rental:write']],
            normalizationContext: ['groups' => ['rental:read']]
        ),
        new GetCollection(
            uriTemplate: '/admin/rentals',
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['rental:read', 'rental:admin']]
        ),
        new Get(
            uriTemplate: '/admin/rentals/{id}',
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['rental:read', 'rental:admin']]
        ),
        new Patch(
            uriTemplate: '/admin/rentals/{id}',
            security: "is_granted('ROLE_ADMIN')",
            denormalizationContext: ['groups' => ['rental:update']]
        ),
    ]
)]
class Rental
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['rental:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Vehicle::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?Vehicle $vehicle = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['rental:read', 'rental:write'])]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['rental:read', 'rental:write'])]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\Column(length: 10)]
    #[Groups(['rental:read', 'rental:write'])]
    private ?string $startTime = null;

    #[ORM\Column(length: 10)]
    #[Groups(['rental:read', 'rental:write'])]
    private ?string $endTime = null;

    #[ORM\Column(length: 100)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 100)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $email = null;

    #[ORM\Column(length: 20)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $phone = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?\DateTimeInterface $birthDate = null;

    #[ORM\Column(length: 50)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $drivingLicenseNumber = null;

    #[ORM\Column(length: 255)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $address = null;

    #[ORM\Column(length: 100)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $city = null;

    #[ORM\Column(length: 20)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $postalCode = null;

    #[ORM\Column(length: 100)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?string $country = null;

    #[ORM\Column]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?float $totalPrice = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups(['rental:read', 'rental:write', 'rental:admin'])]
    private ?array $options = null;

    #[ORM\Column(length: 20)]
    #[Groups(['rental:read', 'rental:admin', 'rental:update'])]
    private ?string $status = 'active';

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['rental:read', 'rental:admin'])]
    private ?\DateTimeInterface $createdAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->status = 'active';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVehicle(): ?Vehicle
    {
        return $this->vehicle;
    }

    public function setVehicle(?Vehicle $vehicle): static
    {
        $this->vehicle = $vehicle;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getStartTime(): ?string
    {
        return $this->startTime;
    }

    public function setStartTime(string $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?string
    {
        return $this->endTime;
    }

    public function setEndTime(string $endTime): static
    {
        $this->endTime = $endTime;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(\DateTimeInterface $birthDate): static
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getDrivingLicenseNumber(): ?string
    {
        return $this->drivingLicenseNumber;
    }

    public function setDrivingLicenseNumber(string $drivingLicenseNumber): static
    {
        $this->drivingLicenseNumber = $drivingLicenseNumber;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): static
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getTotalPrice(): ?float
    {
        return $this->totalPrice;
    }

    public function setTotalPrice(float $totalPrice): static
    {
        $this->totalPrice = $totalPrice;

        return $this;
    }

    public function getOptions(): ?array
    {
        return $this->options;
    }

    public function setOptions(?array $options): static
    {
        $this->options = $options;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}

